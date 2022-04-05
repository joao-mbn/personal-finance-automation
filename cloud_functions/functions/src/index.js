const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { begin } = require('./updateSheet')

admin.initializeApp();

// Start writing Firebase Functions
exports.addToSheet = functions.https.onCall(async (data, context) => {
    // Grab the text parameter.
    const original = data.text;
    begin();
    //Returns the text received
    return `Successfully received: ${original}`;
});