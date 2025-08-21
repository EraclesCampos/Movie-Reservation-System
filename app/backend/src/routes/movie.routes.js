import express from 'express'
import { isAdmin, verifyToken } from '../middlewares/authorization.js'
import { getMovie, getAllMovies, createMovie } from '../controllers/movie.controller.js'
import { file } from '../middlewares/files.js'

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovie)
router.post('/createMovie', verifyToken, isAdmin, file.single("poster"), createMovie)
export default router