import auth from "../../middleware/auth";
import { vehicleControllers } from "./vehicles.controllers";
import express from 'express';

const router = express.Router();

router.post("/", auth("admin"), vehicleControllers.createVehicles);

router.get("/", vehicleControllers.getVehicles);

router.get("/:vehicleId", vehicleControllers.getSingleVehicles);

router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicles);

router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicles);

export const vehicleRoutes = router;