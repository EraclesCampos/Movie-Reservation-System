import express from 'express'
import { getSeats, getReservedSeats } from '../controllers/seats.controller.js'
import { verifyToken } from '../middlewares/authorization.js'
const router = express.Router()

router.get("/get-seats", verifyToken, getSeats)
router.get("/get-reserved-seats", verifyToken, getReservedSeats)

export default router