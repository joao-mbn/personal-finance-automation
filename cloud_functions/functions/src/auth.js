const { google } = require('googleapis');
const fs = require('fs');
const { SPREADSHEET_ID } = require('../constants');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

exports.updateSheet = async function (data, callback) {

    fs.readFile('./keys.json', (err, keys) => {
        if (err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(keys), callback, data);
    });
}

async function authorize(keys, callback, data) {
    const client = new google.auth.JWT(
        keys.client_email,
        null,
        keys.private_key,
        SCOPES
    );
    client.authorize((err, tokens) => {
        appendToSheet(client, data);
    });
}

async function appendToSheet(auth, data) {
    const sheets = google.sheets({ version: 'v4', auth: auth });
    const sheetName = currentMonthAndYear();
    const { place, type, description, quantity } = data;
    const range = `${sheetName}!${quantity > 0 ? 'G3' : 'L3'}`;
    const body = {
        values: [[place, type, description, Math.abs(quantity)]],
        majorDimension: 'ROWS'
    }

    sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: range,
        valueInputOption: 'USER_ENTERED',
        requestBody: body,
    }, (err, result) => {
        if (err) {
            return 'Error!'
        } else {
            return 'Success!';
        }
    });
}

function currentMonthAndYear() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substring(2, 4);
    return `0${month}/${year}`;
}