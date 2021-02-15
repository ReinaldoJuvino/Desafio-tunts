const { google } = require('googleapis')
const credentials =  require('../../credentials.json')

const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

module.exports = {authClient}