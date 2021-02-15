const { authClient } = require('./src/auth/authSheet')
const { googleSheetRun } = require('./src/service/updateSheet')

authClient.authorize(function (err,tokens){
    if (err){
        console.log(err)
    }else {
        console.log('conectado')
        googleSheetRun(authClient)
    }
})