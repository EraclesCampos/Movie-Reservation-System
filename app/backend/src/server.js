import express from 'express'
import cors from 'cors'
import homeRoute from './routes/home.js'

//middlewares globales
const app = express()
app.use(cors())
app.use(express.json())

//rutas
app.use('/movies', homeRoute)

app.listen(3000, ()=>console.log('listening...'))