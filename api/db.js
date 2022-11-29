import mysql from "mysql2"

export  const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:"adamek2003",
    database:"myproject"
})

