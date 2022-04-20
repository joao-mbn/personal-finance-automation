exports.currentMonthAndYear = function () {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().substring(2, 4);
  return `${month < 10 ? '0' : ''}${month}/${year}`;
}

exports.getNextMonth = function (currentMonth) {
  const currentMonthNumber = parseInt(currentMonth.substring(0, 2));
  const currentYear = parseInt(currentMonth.substring(3, 5));
  const nextMonth = currentMonthNumber + 1;

  if (nextMonth > 12) {
    return `01/${currentYear + 1}`
  } else if (nextMonth < 10) {
    return `0${nextMonth}/${currentYear}`
  } else {
    return `${nextMonth}/${currentYear}`
  }
}

exports.getAllSpreadsheetInfo = async function (sheets, spreadsheetId) {
  const request = {
    spreadsheetId: spreadsheetId,
    ranges: [],
    includeGridData: false,
  };
  return (await sheets.spreadsheets.get(request)).data;
}