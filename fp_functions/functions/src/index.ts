const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.addToSheet = functions.https.onCall(async (data, context) => {
    // Grab the text parameter.
    const original = data.text;
    //Returns the text received
    return `Successfully received: ${original}`;
});
