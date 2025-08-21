import express from 'express'
import path from 'path' 
import cors from 'cors'
import cookieParser from 'cookie-parser'
import homeRoutes from './routes/home.routes.js'
import usersRoutes from './routes/users.routes.js'
import moviesRoutes from './routes/movie.routes.js'
import showtimesRouter from './routes/showtimes.routes.js'
import reservationsRouter from './routes/reservation.routes.js'

//middlewares globales
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// static files
app.use("/public", express.static(path.join(process.cwd(), "public")))

//rutas
app.use('/', homeRoutes)
app.use('/users', usersRoutes)
app.use('/movies', moviesRoutes)
app.use('/showtimes', showtimesRouter)
app.use('/reservations', reservationsRouter)

app.listen(3000, ()=>console.log('listening...'))