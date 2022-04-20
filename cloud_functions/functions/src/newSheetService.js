exports.createSheet = async function (sheets, spreadsheetId) {

  const spreadSheetInfo = await getSheetInfo(sheets, spreadsheetId);

  const request = {
    spreadsheetId: spreadsheetId,
    sheetId: spreadSheetInfo.data.sheets[1].properties.sheetId,
    resource: {
      destinationSpreadsheetId: spreadsheetId,
    }
  };
  try {
    // copy newest sheet
    const response = (await sheets.spreadsheets.sheets.copyTo(request)).data;
    // TODO: change title of new sheet
    // TODO: reorder sheets to put new sheet at the position 1
    // TODO: clear entries of new sheet
    // TODO: update formulas of new sheet
  } catch (err) {
    console.error(err);
  }
}

async function getSheetInfo(sheets, spreadsheetId) {
  const request = {
    spreadsheetId: spreadsheetId,
    ranges: [],
    includeGridData: false,
  };
  return await sheets.spreadsheets.get(request);
}