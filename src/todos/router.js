const { Router } = require('express')
const controllers = require("./contollers")


const router = new Router()

//verify if token is valid
router.use(controllers.tokenVerification)

//get all of todos from db by user
router.get('/query',  controllers.getTodos)

//add a new todo by user
router.post('/add', controllers.addTodo)

//delete a todo
router.delete('/delete/:id', controllers.deleteTodo)

//change todo status by id
router.post('/update/:id', controllers.changeStatus)

module.exports = router