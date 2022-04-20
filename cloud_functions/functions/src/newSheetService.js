const { getNextMonth, getAllSpreadsheetInfo } = require('./shared');

exports.createSheet = async function (sheets, spreadsheetId) {
  try {

    const latestSheetsInfo = (await getAllSpreadsheetInfo(sheets, spreadsheetId)).sheets;
    const latestSheetId = latestSheetsInfo[1].properties.sheetId;
    const latestMonth = latestSheetsInfo[1].properties.title;
    const beforeLatestMonth = latestSheetsInfo[2].properties.title;

    await createNewSheetFromLatest(sheets, spreadsheetId, latestSheetId);

    const newSheetTitle = getNextMonth(latestMonth);
    const newSheetId = (await getAllSpreadsheetInfo(sheets, spreadsheetId)).sheets.slice(-1)[0].properties.sheetId;

    await updateNewSheetTitleAndIndex(sheets, spreadsheetId, newSheetId, newSheetTitle);
    await clearNewSheetEntries(sheets, spreadsheetId, newSheetTitle);
    await updateNewSheetFormulas(sheets, spreadsheetId, newSheetTitle, beforeLatestMonth, latestMonth);

  } catch (err) {
    console.error(err);
  }
}

async function createNewSheetFromLatest(sheets, spreadsheetId, sheetId) {
  const request = {
    spreadsheetId: spreadsheetId,
    sheetId: sheetId,
    resource: {
      destinationSpreadsheetId: spreadsheetId,
    }
  };
  return (await sheets.spreadsheets.sheets.copyTo(request)).data;
}

async function updateNewSheetTitleAndIndex(sheets, spreadsheetId, sheetId, title) {
  const request = {
    spreadsheetId: spreadsheetId,
    resource: {
      requests: [{
        updateSheetProperties: {
          fields: 'title, index',
          properties: {
            sheetId: sheetId,
            title: title,
            index: 1,
          },
        },
      }],
    },
  };
  return (await sheets.spreadsheets.batchUpdate(request)).data;
}

async function clearNewSheetEntries(sheets, spreadsheetId, title) {
  const request = {
    spreadsheetId: spreadsheetId,
    range: `${title}!G3:O`,
  };
  return (await sheets.spreadsheets.values.clear(request)).data;
}

async function updateNewSheetFormulas(sheets, spreadsheetId, title, replacedDate, replacingDate) {
  const formulas = await getCellFormulas(sheets, spreadsheetId, title);
  const transformedFormulas = transformFormulas(formulas, replacedDate, replacingDate);
  const request = {
    spreadsheetId: spreadsheetId,
    resource: {
      valueInputOption: 'USER_ENTERED',
      data: transformedFormulas,
    }
  };
  return (await sheets.spreadsheets.values.batchUpdate(request)).data;
}

async function getCellFormulas(sheets, spreadsheetId, title) {
  const request = {
    spreadsheetId: spreadsheetId,
    ranges: [
      `${title}!B2:B8`,
      `${title}!B10:B11`,
      `${title}!B13:B18`,
      `${title}!B20:B24`,
      `${title}!B26:B29`,
      `${title}!B31:B32`,
      `${title}!E2:E9`,
    ],
    valueRenderOption: 'FORMULA',
  };
  return (await sheets.spreadsheets.values.batchGet(request)).data;
}

function transformFormulas(formulas, replacedDate, replacingDate) {
  formulas.valueRanges.forEach(valueRange => {
    valueRange.values.forEach(value => {
      if (typeof value[0] === 'string') {
        value[0] = value[0].replace(new RegExp(replacedDate, 'g'), replacingDate);
      }
    });
  });
  return formulas.valueRanges;
}