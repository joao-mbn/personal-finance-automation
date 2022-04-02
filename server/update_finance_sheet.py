from constants import SPREADSHEET_ID, SHEET_NAME


def update_finance_sheet(sheet, where, type, description, quantity):

    range = '{0}{1}'.format(SHEET_NAME, 'G3' if quantity > 0 else 'L3')

    body = {
        'values': [
            [where, type, description, abs(quantity)]
        ],
        'majorDimension': 'ROWS'
    }

    sheet.values().append(spreadsheetId=SPREADSHEET_ID, range=range, valueInputOption='USER_ENTERED', body=body).execute()