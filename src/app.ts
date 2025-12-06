import express, { Request, Response } from 'express';

import { userRoutes } from './modules/users/users.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { initDB } from './config/db';
import { vehicleRoutes } from './modules/vehicles/vehicles.routes';
import { bookingRoutes } from './modules/bookings/bookings.routes';


const app = express();
app.use(express.json());

// initializing DB
initDB();

// users CRUD
app.use("/api/v1/users", userRoutes);

// localhost:5000/
app.get('/', (req: Request, res: Response) => {
    res.send('Hello Next Level Developers!')
})

// vehicles CRUD
app.use("/api/v1/vehicles", vehicleRoutes);

// bookings crud
app.use("/api/v1/bookings", bookingRoutes)

// authentication
app.use("/api/v1/auth", authRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    })
})

export default app;