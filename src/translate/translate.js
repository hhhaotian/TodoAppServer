const path = require('path')
const { Translate } = require('@google-cloud/translate').v2

tokenPath = path.resolve(__dirname, './GoogleTranslate.json')

process.env.GOOGLE_APPLICATION_CREDENTIALS = tokenPath

const translate = new Translate()


async function translateText(text, target){
    return Promise.resolve(translate.translate(text, target))
}

module.exports = {translateText}



