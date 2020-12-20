import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

export const sendAuthorInviteEmail = functions.firestore.document('author-invites/{email}').onCreate((snap, context) => {
  functions.logger.info('A new author was invited:', snap.id);
});
