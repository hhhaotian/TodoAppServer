const { Router } = require("express")
const contoller = require("./contoller")

const router = Router()


router.get('/', contoller.getUsers)

router.get('/list', contoller.getUserList)

router.post('/register', contoller.addUser)

router.get('/:user', contoller.getUserLogByUserId)

router.post('/login', contoller.login)





module.exports = router