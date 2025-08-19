import express from 'express'
import { isAdmin, verifyToken } from '../middlewares/authorization.js'
import { getMovie, getAllMovies, createMovie } from '../controllers/movie.controller.js'
const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/createMovie', verifyToken, isAdmin, createMovie)
export default router