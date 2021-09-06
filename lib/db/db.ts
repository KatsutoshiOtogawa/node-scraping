import mysql from 'mysql'

export {
    db
}

const db_host = process.env.DB_HOST

const db_user = process.env.DB_USER

const db_password = process.env.DB_PASSWORD

const db_database = process.env.DB_DATABASE

const db_connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_database,
});

const db = {
    connection: db_connection,
    user: db_user,
    password: db_password,
    host: db_host,
    database: db_database
}