# 🚗 Vehicle Rental System – Backend API

### 🌐 Live Website  
🔗 https://vehiclerentalsystems.vercel.app/

---

## 📘 Overview

The **Vehicle Rental System** is a full-featured backend API designed for managing vehicle rentals. It supports secure authentication, role-based authorization, vehicle inventory management, customer profiles, and booking operations. Built with modern technologies, it provides a scalable backend solution for rental-based platforms.

---

## ✨ Features

### 🚘 Vehicles
- Add, update, delete, and retrieve vehicle details  
- Real-time availability tracking  
- Support for multiple vehicle types and pricing

### 👤 Customers
- Register and authenticate customer accounts  
- Manage customer profiles

### 📅 Bookings
- Create and manage bookings  
- Prevent double bookings  
- Handle vehicle returns  
- Automated rental cost calculation

### 🔐 Authentication & Authorization
- Password hashing using **bcrypt**
- Login using **JWT token**
- Role-based permissions:
  - **Admin:** Full access  
  - **Customer:** Limited access  
- Secure protected routes with:

## 🛠️ Technology Stack
- Node.js + TypeScript  
- Express.js  
- PostgreSQL  
- bcrypt  
- jsonwebtoken (JWT)  
- Vercel (Deployment)
