import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.services";


const createVehicles = async (req: Request, res: Response) => {
    
    try {
        const result = await vehicleServices.createVehicles(req.body);
        const user = result.rows[0];
        delete user.created_at;
        delete user.updated_at;

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: user,
        });


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getVehicles();

        const user = result.rows.map((user: any) => {
            
            delete user.created_at;
            delete user.updated_at;
            return user;
        });

        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: user,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
}

const getSingleVehicles = async (req: Request, res: Response) => {
    
    try {
        const result = await vehicleServices.getSingleVehicles(req.params.vehicleId as string);

        const user = result.rows[0];

        delete user.created_at;
        delete user.updated_at;

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: user,
            });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
}

const updateVehicles = async (req: Request, res: Response) => {
    
    const { vehicle_name, type } = req.body;
    try {
        const result = await vehicleServices.updateVehicles(vehicle_name, type, req.params.vehicleId as string);
        const vehicle = result.rows[0];
        delete vehicle.created_at;
        delete vehicle.updated_at;

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: vehicle,
            });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
}

const deleteVehicles = async (req: Request, res: Response) => {
    
    try {
        const result = await vehicleServices.deleteVehicles(req.params.vehicleId as string);

        const vehicle = result.rows[0];
        delete vehicle.created_at;
        delete vehicle.updated_at;

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
                data: vehicle,
            });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
}


export const vehicleControllers = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles,
}