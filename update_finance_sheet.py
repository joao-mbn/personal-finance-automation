from constants import SAMPLE_SPREADSHEET_ID

SAMPLE_RANGE_NAME = 'Março 2022!A1:U100'

def update_finance_sheet(sheet):
    result = sheet\
        .values()\
        .get(spreadsheetId=SAMPLE_SPREADSHEET_ID, range=SAMPLE_RANGE_NAME)\
        .execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')
        return
    else:
        print(values)