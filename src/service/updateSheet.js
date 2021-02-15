const { google } = require('googleapis')

async function googleSheetRun(client) {
    const googleSheetAPi = google.sheets({
        version: 'v4',
        auth: client
    })
    const options = {
        spreadsheetId: '1-fCUoiI21aUxozY4kHZr6zTe9cowSFALmQjU-1biDzU',
        range: 'engenharia_de_software!A4:H27'
    }
    let data = await googleSheetAPi.spreadsheets.values.get(options)
    let dataArray = data.data.values
    let newDataArray = []

    dataArray.map(function (row) {

        let rowUpdate = []
        const gradeAverage = (parseInt(row[3]) + parseInt(row[4]) + parseInt(row[5])) / 3

        if(row[2] >= 15){
            rowUpdate.push('Reprovado por Falta')
            rowUpdate.push(0)
            newDataArray.push(rowUpdate);
        }else if(gradeAverage < 50) {
            rowUpdate.push('Reprovado por nota')
            rowUpdate.push(0)
            newDataArray.push(rowUpdate)
            return
        } else if(gradeAverage > 70) {
            rowUpdate.push('Aprovado')
            rowUpdate.push(0)
            newDataArray.push(rowUpdate)
            return
        } else {
            rowUpdate.push('Exame final')
            let naf = Math.ceil(100 - gradeAverage)
            rowUpdate.push(naf)
            newDataArray.push(rowUpdate)
        }
    })
    console.log(newDataArray)
    const updateOptions = {
        spreadsheetId: '1-fCUoiI21aUxozY4kHZr6zTe9cowSFALmQjU-1biDzU',
        range: 'engenharia_de_software!G4',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newDataArray }
    }
    await googleSheetAPi.spreadsheets.values.update(updateOptions)
}

module.exports = {googleSheetRun}