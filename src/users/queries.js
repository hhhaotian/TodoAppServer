const getUsers = "SELECT * FROM users";

const getUsersByUsername = "SELECT * FROM users WHERE username = $1"

const getUsersByUserId = "SELECT userid, timestamp FROM login WHERE userid = $1"

const addUser = "INSERT INTO users ( username, password, type ) VALUES ($1, $2, $3);"

const checkValidUser = "SELECT * FROM users WHERE username = $1 AND password = $2"

const addLoginRecord = "INSERT INTO login (userid, timestamp) VALUES ($1, $2)"

const getUserList = 
    `
    SELECT users.id, username, password, count(timestemp) AS translations FROM users LEFT JOIN translation 
    ON users.id = userid                
    GROUP BY users.id
    `


module.exports = {
    getUsers,
    getUsersByUserId,
    addUser,
    checkValidUser,
    addLoginRecord,
    getUserList,
    getUsersByUsername
}