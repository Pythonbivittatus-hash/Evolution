function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const payload = JSON.parse(e.postData.contents || '{}');

    sheet.appendRow([
      new Date(),
      payload.name || '',
      payload.email || '',
      Array.isArray(payload.interests) ? payload.interests.join(', ') : '',
      payload.versionInterest || '',
      payload.skills || '',
      payload.message || '',
      payload.consent ? 'Yes' : 'No',
      payload.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Evolution signup endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet_() {
  const spreadsheetName = 'Evolution Playtest & Early Access Signups';
  const sheetName = 'Signups';
  const files = DriveApp.getFilesByName(spreadsheetName);
  let spreadsheet;

  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    spreadsheet = SpreadsheetApp.create(spreadsheetName);
  }

  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted At',
      'Name',
      'Email',
      'Interests',
      'Version Interest',
      'Skills / Contribution',
      'Message',
      'Consent',
      'Source'
    ]);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 9);
  }

  return sheet;
}
