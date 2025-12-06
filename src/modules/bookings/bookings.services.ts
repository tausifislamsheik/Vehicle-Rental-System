import { pool } from "../../config/db";

const createBookings = async (customerId: number, vehicleId: number, start: string, end: string) => {
    const vehicle = await pool.query(`SELECT vehicle_name, daily_rent_price from vehicles WHERE id=$1 AND availability_status='available'`,
        [vehicleId]
    );

    if (vehicle.rows.length === 0) {
        throw new Error("Vehicle not available");
    }

    const { vehicle_name, daily_rent_price } = vehicle.rows[0];

    const price = Number(vehicle.rows[0].daily_rent_price);
    const days = Math.ceil(new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24);

    if (days <= 0) throw new Error("Invalid rent period");

    const totalPrice = days * price;

    const booking = await pool.query(`INSERT into bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
        VALUES($1, $2, $3, $4, $5, 'active') RETURNING id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status `,
        [customerId, vehicleId, start, end, totalPrice]
    );

    await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1 `,
        [vehicleId]
    )

    return {
        ...booking.rows[0],
        vehicle: {
            vehicle_name,
            daily_rent_price: Number(daily_rent_price)
        }
    };

};

const getBookings = async (role: string, userId?: number) => {
    if (role === "admin") {
        const result = await pool.query(`
            SELECT 
            b.id, b.customer_id, b.vehicle_id,
            b.rent_start_date, b.rent_end_date,
            b.total_price, b.status,
            
            c.name as customer_name,
            c.email as customer_email,

            v.vehicle_name,
            v.registration_number

            FROM bookings b
            JOIN users c ON b.customer_id = c.id
            JOIN vehicles v ON b.vehicle_id = v.id
            ORDER BY b.id ASC 
            `);

        return result.rows.map(row => ({
            id: row.id,
            customer_id: row.customer_id,
            vehicle_id: row.vehicle_id,
            rent_start_date: row.rent_start_date,
            rent_end_date: row.rent_end_date,
            total_price: row.total_price,
            status: row.status,
            customer: {
                name: row.customer_name,
                email: row.customer_email
            },
            vehicle: {
                vehicle_name: row.vehicle_name,
                registration_number: row.registration_number
            }
        }));
    }

    const result = await pool.query(`
            SELECT 
            b.id, b.vehicle_id,
            b.rent_start_date, b.rent_end_date,
            b.total_price, b.status,
            
            v.vehicle_name,
            v.registration_number,
            v.type

            FROM bookings b
            JOIN vehicles v ON b.vehicle_id = v.id
            WHERE b.customer_id = $1
            ORDER BY b.id ASC 
            `, [userId]);

    return result.rows.map(row => ({
        id: row.id,
        customer_id: row.customer_id,
        vehicle_id: row.vehicle_id,
        rent_start_date: row.rent_start_date,
        rent_end_date: row.rent_end_date,
        total_price: row.total_price,
        status: row.status,
        vehicle: {
            vehicle_name: row.vehicle_name,
            registration_number: row.registration_number,
            type: row.type
        }
    }));
}



const updateBookings = async (bookingId: string, status: string, role: string, userId?: number) => {
    if (role === "customer" && status !== "cancelled") {
        throw new Error("Customers can only cancel bookings.");
    }

    let bookingQuery = `SELECT * FROM bookings WHERE id=$1`;

    const bookingCheck = await pool.query(bookingQuery, [bookingId]);

    if (bookingCheck.rowCount === 0) throw new Error("Booking not found");

    const booking = bookingCheck.rows[0];

    if (role === "customer" && booking.customer_id !== userId) {
        throw new Error("You can update your own bookings.");
    }

    const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`, [status, bookingId]
    );

    const updateBooking = result.rows[0];

    let vehicleStatus = null;

    if (status === "returned" && role === "admin") {
        await pool.query(`UPDATE vehicles SET availability_status='available' WHERE id=$1`, [updateBooking.vehicle_id]
        );

        vehicleStatus = { availability_status: 'available' };
    }

    return {
        booking: updateBooking,
        vehicle: vehicleStatus
    }
}

export const bookingServices = {
    createBookings,
    getBookings,
    updateBookings,
}