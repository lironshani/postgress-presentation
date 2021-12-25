/**
 * Short: A Connection Pool is a way to minimize connections to databases,
 * It ensures ‘closed’ connections are not really closed,
 * but returned to a pool, and ‘opening’ a new connection returns the same ‘physical connection’ back,
 * reducing the actual forking on the PostgreSQL side
 * 
 * Long: https://www.ashnik.com/everything-you-need-to-know-about-connection-pooling-in-postgres/
 */
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: "localhost",
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
})

module.exports = pool;