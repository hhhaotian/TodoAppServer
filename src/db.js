const Pool = require("pg").Pool

const pool = new Pool({
    // user:"haotianzhu",
    // host: "localhost",
    // database: "todosapp",
    // port:5432
    user:"postgres",
    host: "104.197.53.162",
    password:'test123',
    database: "postgres"
})

module.exports = pool
