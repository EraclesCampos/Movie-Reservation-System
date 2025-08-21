import mysql2 from 'mysql2/promise'

export const db = await mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_reservation_system',
    timezone: "Z",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

console.log('Base de datos conectada')