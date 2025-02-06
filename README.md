# API Documentation

## Swagger Documentation

You can view the API documentation here:  
🔗 **[Swagger UI](https://irctc-up13.onrender.com/api-docs/)**  

# IRCTC Clone - Train Ticket Booking System 🚆

This project is a train ticket booking system built using **Node.js, Express, Sequelize, and PostgreSQL**.  
It allows users to book and cancel train tickets while ensuring **consistency and durability** using transactions.  

---

## 📌 Features
- **Train Management**: Add and update trains with available seats.
- **Station Management**: Link stations with trains to check stoppages.
- **Ticket Booking**: Users can book tickets while ensuring **database consistency**.
- **Cancellation**: Users can cancel tickets and get their seats restored.
- **Rate Limiting**: Prevents excessive requests using `express-rate-limit`.
- **Swagger API Documentation**: Available for easy testing.

---

## 🚀 **Setup & Installation**
### 1️. Clone the Repository  
```sh
git clone https://github.com/Biranjay-kumar/IRCTC.git
cd IRCTC
```
### 2. Install Dependencies
	```npm install```

### 3. .env setup
```
PORT=5000
DB_HOST=your_postgres_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
DB_PORT=5432
JWT_SECRET=your_secret_key
ADMIN_API_KEY=you_admin_key
```

