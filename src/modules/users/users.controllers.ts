import { Request, Response } from "express";
import { userServices } from "./users.services";

const createUser = async (req: Request, res: Response) => {
    
    try {
        const result = await userServices.createUser(req.body);
        const user = result.rows[0];
        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user,
        });


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser();

        const user = result.rows.map((user: any)=>{
             delete user.password;
             delete user.created_at;
             delete user.updated_at;
             return user;
        });

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
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

const updateUser = async (req: Request, res: Response) => {
    
    const { name, email} = req.body;
    try {
        const result = await userServices.updateUser(name, email, req.params.userId as string);
        const user = result.rows[0];
        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
    
    try {
        const result = await userServices.deleteUser( req.params.userId as string);
        const user = result.rows[0];
        delete user.password;
        delete user.created_at;
        delete user.updated_at;

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
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


export const userControllers = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}