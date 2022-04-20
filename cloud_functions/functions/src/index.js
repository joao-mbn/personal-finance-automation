const fs = require('fs');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { google } = require('googleapis');
const { SPREADSHEET_ID } = require('../constants');
const updateSheetService = require('./updateSheetService');
const newSheetService = require('./newSheetService');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

admin.initializeApp();

exports.addToSheet = functions.https.onCall((data, context) => {
  return authorize(data.text, updateSheetService.addToSheet);
});

exports.createSheet = functions.pubsub.schedule('1 0 1 * *').timeZone('America/Sao_Paulo').onRun((context) => {
  return authorize(null, newSheetService.createSheet);
});

function authorize(data, callback) {

  fs.readFile('./keys.json', (err, keys) => {

    if (err) return console.log('Error loading client secret file:', err);
    keys = JSON.parse(keys);
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      SCOPES
    );
    client.authorize((err, tokens) => {
      const sheets = google.sheets({ version: 'v4', auth: client });
      callback(sheets, SPREADSHEET_ID, data);
    });

  });
}