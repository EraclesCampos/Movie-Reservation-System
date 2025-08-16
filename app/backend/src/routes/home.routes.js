import express from 'express'
import { getAllMovies } from '../controllers/movie.controller.js'
const router = express.Router()

router.get('/home', getAllMovies)

export default router