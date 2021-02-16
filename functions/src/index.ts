import * as functions from 'firebase-functions';
import * as mailer from 'nodemailer';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
const viewDecrementValue = 10;
const app = express();
app.use(cors());
admin.initializeApp();

const mailTransport = mailer.createTransport({
  host: functions.config().email.server,
  port: functions.config().email.port,
  auth: {
    user: functions.config().email.email,
    pass: functions.config().email.pass,
  },
});

app.post('/blogs/', async (req, res) => {
  functions.logger.info('Blog View', req.body.id);
  const id = req.body.id;
  const snapshot = await admin.firestore().doc(`blogs/${id}`);
  const doc = await snapshot.get();
  const views = doc.get('views');
  await snapshot.update({views: views + 1});
  res.send({id, views: views + 1});

});

app.post('/pagefiles/',  async (req, res) => {
  functions.logger.info('Page File', req.body);
});

export const httpRequests = functions.https.onRequest(app);


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
