import mysql2 from 'mysql2/promise'

export const db = await mysql2.createPool({
    host: 'database',
    user: 'movie_user',
    password: 'movie_pass',
    database: 'movie_reservation_system',
    timezone: "Z",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

console.log('Base de datos conectada')