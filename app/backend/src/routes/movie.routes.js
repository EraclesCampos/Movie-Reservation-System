import express from 'express'
import { isAdmin, verifyToken } from '../middlewares/authorization.js'
import { getMovie, getAllMovies, createMovie, editMovie } from '../controllers/movie.controller.js'
import { file, handleMovieImage } from '../middlewares/files.js'

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:slug/:id', getMovie)
router.post('/createMovie', verifyToken, isAdmin, file.single("poster"), createMovie)
router.post('/editMovie', verifyToken, isAdmin, file.single("poster"), handleMovieImage, editMovie)
export default router