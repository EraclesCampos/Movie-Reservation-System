import express from 'express'
import { createReservation } from '../controllers/reservation.controller.js'
import { verifyToken, isAdmin } from "../middlewares/authorization.js"

const router = express.Router()

router.post("/create-reservation", verifyToken, createReservation)

export default router