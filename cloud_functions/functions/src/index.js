const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { updateSheet } = require('./auth');

admin.initializeApp();

exports.addToSheet = functions.https.onCall((data, context) => {
    return updateSheet(data.text);
});