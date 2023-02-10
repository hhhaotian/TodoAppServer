const express = require('express')
const userRouter = require('./users/router')
const todoRouter = require('./todos/router')
const translateRouter = require('./translate/router')
const fs = require('fs')
const https = require('https')

const app = express()


app.use(express.json())

//set request header to solve CORS issue
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE")
    next()
})

app.get('/', (req, res) => {
    res.send("Hollo world")
})



app.use('/api/translate', translateRouter)


//midware for user api
app.use('/api/users', userRouter)


//midware for todo api
app.use('/api/todos', todoRouter)

// app.listen(8080, ()=>{
//     console.log("server is running, listening on http://localhost:8080")
// })

https.createServer(
    {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert")
    },
    app
).listen(8080, () => {
    console.log("server is listening port 8080")
})

