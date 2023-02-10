const queries = require('./queries')
const pool = require('../db');
const jwt = require('jsonwebtoken')
const key = require('../../config.json').key


const tokenVerification = (req, res, next) => {
    //received pre-flight requrest from browser
    if(req.method === "OPTIONS"){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end();
    }else{
        try{
            const token = req.headers['authorization'].split(" ")[1]
            jwt.verify(token, key)
            next()
        }catch(e){
            console.log("token verification error")
            res.status(403).send({
                status: "reject",
                data: "verification error"
            })
        }
    }
}


getUserData = (req) => {
    const token = req.headers['authorization'].split(" ")[1]
    const userData = jwt.verify(token, key)
    return userData
}


//get all of todos from db
const getTodos = (req, res) => {
    const userId = getUserData(req).id
    pool.query(queries.getTodos, [userId],(error, results) => {
        if(error) throw error
        res.status(200).send({
            status:"ok",
            data:results.rows
        })
    })
   
}

//add a new todo
const addTodo = (req, res) => {
    const userid = getUserData(req).id
    const {todo, done, deadline} = req.body
    //add new todo into table
    new Promise((resolve, reject) => {
        pool.query(queries.addTodo, [userid, todo, done, deadline],(error, results) => {
            if(error){
                reject(errir)
            }else{
                resolve(results)
            }
        })
    })
    //query the new added todo as response message
    .then(() => {
        pool.query(queries.getTodos, [userid], (error, result) => {
            if(error) return error
            res.status(200).send({
                status:"ok",
                data:result.rows.at(-1)
            })
        })
    })
    .catch(err => {
        res.status(400).send({
            statue:"reject",
            data: err
        })
    })
    
    
}


//delete a todo
const deleteTodo = (req, res) => {
    const id = req.params.id
    new Promise((resolve, reject) => {
        pool.query(queries.deleteTodo, [id], (error, result) => {
            if(error){
                reject(error)
            }
            resolve(result)
            
        })
    })
    .then(() => {
        res.status(201).send({
            status: "ok",
            data: "deleted successfully"
        })
    })

}

//change todo status
const changeStatus = (req, res) => {
    const id = req.params.id
    const {isdone} = req.body
    pool.query(queries.changeStatus, [isdone, id], (error, result) => {
        if(error) throw error
        res.status(201).json({"update": "done"})
    })
}

module.exports = {
    tokenVerification,
    getTodos, 
    addTodo, 
    deleteTodo,
    changeStatus
}
