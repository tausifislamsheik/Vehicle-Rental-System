import express from 'express';
import auth from '../../middleware/auth';
import { bookingControllers } from './bookings.controllers';


const router = express.Router();

router.post("/", auth("admin", "customer"), bookingControllers.createBookings);

router.get("/", auth("admin", "customer"), bookingControllers.getBookings);

router.put("/:bookingId", auth("admin", "customer"), bookingControllers.updateBookings);


export const bookingRoutes = router;