const GENERAL_INFORMATION_COUNT = 9

function doPost(e) {
  let data = JSON.parse(e.postData.contents)

  let sheet = getSheet(data.sheetName)

  let row

  switch(data.type) {
    case 'register':
      sheet.appendRow([
        Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd | HH:mm:ss'), 
        data.id,
        data.ip,
        data.country,
        data.region,
        data.city,
        0])
        break
    case 'time_update':
      row = getRow(data.id, sheet)
      row.getCell(1, 7).setValue(data.time)
      break
    case 'link_click':
      row = getRow(data.id, sheet)
      append(data.link, row.getCell(1, 8))
      break
    case 'value_update':
      let valueColumn = sheet
        .getRange(2, GENERAL_INFORMATION_COUNT + 1, 1, sheet.getLastColumn() - GENERAL_INFORMATION_COUNT + 2)
        .createTextFinder(data.valueName)
        .findNext()

      if(valueColumn == null) {
        sheet
        .getRange(2, sheet.getLastColumn() + 1)
        .setValue(data.valueName)
        valueColumn = sheet.getLastColumn()
      } else {
        valueColumn = valueColumn.getColumn()
      }

      row = getRow(data.id, sheet)
      let valueCell = row.getCell(1, valueColumn)

      switch(data.valueType) {
        case 'number':
          valueCell.setHorizontalAlignment("right")
          valueCell.setValue(data.value)
          break
        case 'string':
          valueCell.setHorizontalAlignment("left")
          valueCell.setValue(data.value)
          break
        case 'boolean':
          valueCell.setHorizontalAlignment("center")
          if(data.value) {
            valueCell.setValue('=IMAGE("https://www.pngall.com/wp-content/uploads/2/Dot-PNG-Free-Download.png")')
          } else {
            valueCell.setValue('')
          }
          break
        case 'number_increment':
          valueCell.setHorizontalAlignment("right")
          valueCell.setValue(valueCell.getValue() + data.value)
          break
        case 'string_append':
          valueCell.setHorizontalAlignment("left")
          append(data.value, valueCell)
          break
        default:
          throw `Value type ${data.valueType} does not exist!` 
      }

      break
    default:
      throw `Reqeust type ${data.type} does not exist!` 
  }
}

function getSheet(name) {
  return SpreadsheetApp.getActive().getSheetByName(name)
}

function getRow(uuid, sheet) {
  return sheet.getRange(
    sheet
      .getRange(3, 2, sheet.getLastRow() - 2, 1)
      .createTextFinder(uuid)
      .findNext()
      .getRow(),
    1,
    1,
    sheet.getLastColumn())
}

function append(value, cell) {
  let currValue = cell.getValue()
  if (currValue != '') {
    currValue += '\n'
  }

  currValue += value
  cell.setValue(currValue)
}