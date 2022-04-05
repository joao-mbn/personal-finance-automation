const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { updateSheet } = require('./updateSheet')

admin.initializeApp();

// Start writing Firebase Functions
exports.addToSheet = functions.https.onCall((data, context) => {
    return updateSheet(data.text);
});