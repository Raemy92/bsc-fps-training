/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import functions = require('firebase-functions')
import admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()

exports.onUserCreate = functions.auth.user().onCreate((user: any) => {
  const userDoc = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
    userAwards: []
  }

  db.collection('users').doc(user.uid).set(userDoc)
})

exports.onUserDelete = functions.auth.user().onDelete(async (user: any) => {
  await db.collection('users').doc(user.uid).delete()
})
