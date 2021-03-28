import * as functions from 'firebase-functions';
import * as mailer from 'nodemailer';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as url from 'url';
import * as puppeteer from 'puppeteer';
import fetch from 'node-fetch';
// const fetch = require('node-fetch');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
const viewDecrementValue = 10;
const app = express();
const siteData: SiteData = {pages : [], blogs : []};

app.use(cors());
admin.initializeApp();
refreshSiteData().then(() => {
  functions.logger.info('Initial Refresh');
});

interface SiteData {
  pages: {title: string, body: string, id: string}[];
  blogs: {title: string, body: string, id: string}[];
}

const searchScoring = {
  pageTitle: 100,
  blogTitle: 50,
  pageBody: 10,
  blogBody: 1,
};

// interface PageNode {
//   url: string;
//   title: string;
//   children?: PageNode[];
// }

interface FireStorePage {
  parent: string;
  children: any;
  title: string;
  body: string;
  showChildren: boolean;
  id: string;
  draft: boolean;
}

interface BlogFSObject {
  date: Date;
  title: string;
  author: string;
  body: string;
  views: number;
  featured: boolean;
  draft: boolean;
}

interface SearchResult {
  type: 'blog' | 'page';
  score: number;
  id: string;
  title: string;
}


async function refreshSiteData(): Promise<void> {
  const pages = [];
  const blogs = [];
  const pageDocsList = await admin.firestore().collection('pages').listDocuments();
  for (const page of pageDocsList) {
    const pageSnap = await page.get();
    const data = await pageSnap.data() as FireStorePage;
    if (!data.draft){
      pages.push({
        title: data.title,
        body: data.body,
        id:  pageSnap.id,
      });
    }
  }

  const blogDocsList = await admin.firestore().collection('blogs').listDocuments();
  for (const blog of blogDocsList) {
    const blogSnap = await blog.get();
    const data = await blogSnap.data() as BlogFSObject;
    if (!data.draft){
      blogs.push({
        title: data.title,
        body: data.body,
        id: blogSnap.id,
      });
    }
  }
  siteData.pages = pages;
  siteData.blogs = blogs;
  functions.logger.info('Site Refreshed');
}

const mailTransport = mailer.createTransport({
  host: functions.config().email.server,
  port: functions.config().email.port,
  auth: {
    user: functions.config().email.email,
    pass: functions.config().email.pass,
  },
});

const appURL = 'bcedaccess-website.web.app';
// const renderURL = 'https://rendertron-305123.wl.r.appspot.com/render';

app.post('/blogs/', async (req, res) => {
  functions.logger.info('Blog View', req.body.id);
  const id = req.body.id;
  const snapshot = await admin.firestore().doc(`blogs/${id}`);
  const doc = await snapshot.get();
  const views = doc.get('views');
  await snapshot.update({views: views + 1});
  res.send({id, views: views + 1});

});

app.get('/search/:search/:limit', async (req, res) => {
  let search: string = req.params.search;
  let limit: number;
  try {
    limit = parseInt(req.params.limit, 10);
  } catch (e) {
    res.status(400).send({err: 'Limit Malformed'});
    return;
  }
  if (!limit){
    res.status(400).send({err: 'Limit Malformed'});
    return;
  }
  if (!search){
    res.status(400).send({err: 'Empty Search Term'});
    return;
  }
  search = search.toLowerCase();
  functions.logger.info('Search for: ', search);
  console.log('Search for: ', search);

  const rv: SearchResult[] = [];
  siteData.blogs.forEach(blog => {
    const score =  searchScoring.blogTitle * (blog.title.toLowerCase().match(new RegExp(search, 'g')) || []).length +
                    searchScoring.blogBody * (blog.body.toLowerCase().match(new RegExp(search, 'g')) || []).length;
    if (score > 0) {
      rv.push({
        type: 'blog',
        score,
        id: blog.id,
        title: blog.title,
      });
    }
  });

  siteData.pages.forEach(page => {
    const score =  searchScoring.pageTitle * (page.title.toLowerCase().match(new RegExp(search, 'g')) || []).length +
                    searchScoring.pageBody * (page.body.toLowerCase().match(new RegExp(search, 'g')) || []).length;
    if (score > 0) {
      rv.push({
        type: 'page',
        score,
        id: page.id,
        title: page.title,
      });
    }
  });

  rv.sort((a, b) => {
    return b.score - a.score;
  });

  res.status(200).send({search, limit, results: rv});
});

app.post('/pagefiles/',  async (req, res) => {
  functions.logger.info('Page File', req.body);
});

function generateUrl(request: any): string {
  return url.format({
    protocol: 'https:',
    host: appURL,
    pathname: request.originalUrl,
  });
}

function detectBot(userAgent: any): boolean {
  const bots = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',

    'twitterbot',
    'facebookexternalhit',
    'linkedinbot',
    'embedly',
    'pinterest',
    'slackbot',
    'facebot',

  ];

  const agent = userAgent.toLowerCase();
  for (const bot of bots) {
    if (agent.indexOf(bot) > -1) {
      console.log('BOT', bot);
      return true;
    }
  }
  return false;
}

async function getSEOContent(botURL: string): Promise<string> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(botURL , {waitUntil: 'networkidle2'});
  const content = await page.content();
  await browser.close();
  return content;
}

app.get('*', (req, res) => {
  const isBot = detectBot(req.headers['user-agent']);

  if (isBot) {
    const botURL = generateUrl(req);
    functions.logger.info('url being fetched', `${botURL}`);
    getSEOContent(botURL)
      .then((content) => {
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.set('Vary', 'User-Agent');
        res.send(content);
      });
  } else{
    fetch(`https://${appURL}`)
      .then((r: any) => r.text())
      .then((body: any) => {
        res.send(body.toString());
      });
  }

});

exports.app = functions .runWith({
  timeoutSeconds: 120,
  memory: '2GB',
}).https.onRequest(app);

export const scheduledRefresh = functions.pubsub.schedule('every 2 hours').onRun((context) => {
  refreshSiteData().then(() => {
    functions.logger.info('Scheduled Site Refreshed Complete At', context.timestamp);
  });
});

export const decrementBlogViews = functions.pubsub.schedule('30 5 * * *').onRun((context) => {
  functions.logger.info('Decrementing Blog Views at ', context.timestamp, viewDecrementValue);
  admin.firestore().collection('blogs').get().then((snapshot) => {
    snapshot.forEach((blog) => {
      const views: number = blog.data().views;
      admin.firestore().doc(`blogs/${blog.id}`).update({views: Math.max(0, views - viewDecrementValue)}).then(() => {
          functions.logger.info(blog.id, ' views decremented');
          return null;
      });
      return null;
    });
  });
  return null;

});

export const sendAuthorInviteEmail = functions.firestore.document('author-invites/{email}').onCreate(async (snap, context) => {
  functions.logger.info('A new author was invited:', snap.id);
  const mailOptions = {
    from: 'noreply@bcedaccess.com',
    to: snap.id,
    subject: 'You have been invited to be an author on BCEdAccess.com',
    html: `<a href = "bcedaccess.com/acceptinvite?email=${snap.id}">Click here to accept your invite, and create your account.</a>`,
  };
  try {
    await mailTransport.sendMail(mailOptions);
  } catch (error) {
    console.error('There was an error while sending the email:', error);
  }
});
