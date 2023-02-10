const getTodos = `
SELECT todos.id, todos.todo, todos.done, todos.deadline, users.username  
FROM todos LEFT JOIN users 
ON todos.userid = users.id 
WHERE userid = $1
`


const addTodo = `INSERT INTO todos (userid, todo, done, deadline) 
    VALUES($1, $2, $3, $4)
`
const deleteTodo = "DELETE FROM todos WHERE ID = $1"

const changeStatus = "UPDATE todos SET done = $1 WHERE ID = $2"

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    changeStatus
}