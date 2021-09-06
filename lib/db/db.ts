import { Pool} from 'pg'
// pools will use environment variables
// for connection information

export {
    db,
}
const pool = new Pool()

const db = {
    pool: pool
}

// you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()