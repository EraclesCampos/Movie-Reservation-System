import express from 'express'
import { createReservation, getReservations } from '../controllers/reservation.controller.js'
import { verifyToken, isAdmin } from "../middlewares/authorization.js"

const router = express.Router()

router.post("/create-reservation", verifyToken, createReservation)
router.get("/get-reservations/:id", verifyToken, getReservations)

export default router