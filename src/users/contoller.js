const pool = require("../db")
const queires = require('./queries')
const jwt = require('jsonwebtoken')
const config = require('../../config.json')



const getUsers = (req, res) => {
        pool.query(queires.getUsers, (error, results) => {
            if(error) throw error
            res.status(200).json(results.rows)
        })
    
    
}

const loginRecord = (userid) => {
    pool.query(queires.addLoginRecord, [userid, new Date().toString()])
}


//handle login request when a user login to the website
const login = async (req, res) => {
    const {username, password} = req.body
    //check if username is in database and password is correct 
    const userExists = new Promise((resolve, reject) => {
        pool.query(queires.checkValidUser, [username, password],(error, result)=>{
            if(error){
                console.log('error occurs',error)
                reject(error)
            }
            resolve(result)
        })
    })
    const userStatus = await userExists.then(res => res.rows)
    if(userStatus.length !== 0){
        const {id, username, type} = userStatus[0]
        const data = {id, username, type}
        const token = jwt.sign(data, config.key, {expiresIn: "7d"})
        loginRecord(id)
        res.send({
            status:"ok",
            data,
            token
        })
    }else{
        res.send({
            status:"reject",
            data:"username or password is wrong"
        })
    }

}

const addUser = (req, res) => {
    const { username, password, type } = req.body
    // console.log(username, password, type)
    // res.send(username)
    //check username exits
    pool.query(queires.getUsersByUsername, [username], (error, results) => {
        if(error) throw error
        if(results.rows.length){
            res.status(401).send({
                status:"reject",
                data: `${username} exists, please login`
            })
        }
        //add user to db
        pool.query(queires.addUser, [username, password, type], (error, results) => {
            if (error) throw error
            res.status(201).send({
                status: 'ok',
                data: "user created successfully"
            })
        })
    })

}


const getUserLogByUserId = (req, res) => {
    const userId = req.params.user
    pool.query(queires.getUsersByUserId, [userId], (error, results) => {
        if(error) throw error
        res.status(200).send({
            status: 'ok',
            data: results.rows
        })
    })

}

const getUserList = (req, res) => {
    try{
        const token = req.headers['authorization'].split(' ')[1]
        if(jwt.verify(token, config.key).type === 'admin'){
            pool.query(queires.getUserList, (error, results) => {
                if(error) throw error
                res.status(200).send({
                    status: "ok",
                    data: results.rows
                })
            })
        }else{
            res.status(401).send({
                status: 'reject',
                data: 'not autorized'
            })
        }
    }catch(e){
        res.status(401).send({
            status: 'reject',
            data: 'error'
        })
    }
    
}


module.exports = {getUsers, getUserLogByUserId, addUser, login, getUserList} 