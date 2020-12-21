import * as functions from 'firebase-functions';
import * as mailer from 'nodemailer';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
const viewDecrementValue = 10;

admin.initializeApp();

const mailTransport = mailer.createTransport({
  host: functions.config().email.server,
  port: functions.config().email.port,
  auth: {
    user: functions.config().email.email,
    pass: functions.config().email.pass,
  },
});

export const helloWorld = functions.https.onRequest( (request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

export const decrementBlogViews = functions.pubsub.schedule('30 5 * * *').onRun((context) => {
  functions.logger.info('Decrementing Blog Views at ', context.timestamp);
  admin.firestore().collection('blogs').get().then((snapshot) => {
    snapshot.forEach((blog) => {
      const views: number = blog.data().views;
      admin.firestore().doc(`blogs/${blog.id}`).update({views: Math.max(0, views - viewDecrementValue)}).then(() => {});
    });
  });

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
