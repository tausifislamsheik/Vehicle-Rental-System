import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;

    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    );

    return result;
}

const getVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

const getSingleVehicles = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);

    return result;

}

const updateVehicles = async (vehicle_name: string, type: string, id: string) => {
    const result = await pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2 WHERE id=$3 RETURNING *`, [vehicle_name, type, id]
    );

    return result;
}

const deleteVehicles = async (id: string) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`, [id]);
    return result;
}



export const vehicleServices = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles,
}