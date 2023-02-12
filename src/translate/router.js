const {Router} = require('express')
const translate = require('./translate')
const pool = require('../db')

const router = new Router()

router.post('/', async (req, res) => {
    const {userid, text, target} = req.body
    try{
        const translateResult = await translate.translateText(text, target)
        translationLog(userid)
        res.status(200).send({
            status: "ok",
            data: translateResult[1].data
        })
    }catch(e){
        res.status(403).send({
            status: "reject",
            data: e
        })
    }
    
})

const translationLog = (userid) => {
    pool.query(
        "INSERT INTO translation (userid, timestemp) VALUES ($1, $2)",
        [userid, new Date().toString()]
        )
}

module.exports = router