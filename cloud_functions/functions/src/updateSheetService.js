const { currentMonthAndYear } = require('./shared');

exports.addToSheet = function (sheets, spreadsheetId, data) {

  const sheetName = currentMonthAndYear();
  const { place, type, description, quantity } = data;
  const range = `${sheetName}!${quantity > 0 ? 'G3' : 'L3'}`;
  const body = {
    values: [[place, type, description, Math.abs(quantity)]],
    majorDimension: 'ROWS'
  }

  sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
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
