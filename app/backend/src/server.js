import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import homeRoutes from './routes/home.routes.js'
import usersRoutes from './routes/users.routes.js'

//middlewares globales
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//rutas
app.use('/', homeRoutes)
app.use('/users', usersRoutes)

app.listen(3000, ()=>console.log('listening...'))