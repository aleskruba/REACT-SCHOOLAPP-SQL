import mysql from "mysql2"
import {
DB_HOST,
DB_USER,
DB_PASSWORD,
DB_NAME,
DB_PORT


} from './config.js'

export  const db = mysql.createConnection({
    user:DB_USER,
    host:DB_HOST,
    password:DB_PASSWORD,
    database:DB_NAME,
    port:DB_PORT
})

