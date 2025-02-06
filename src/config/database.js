import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Use Sequelize to handle PostgreSQL connection
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("Connected to PostgreSQL successfully"))
  .catch((err) => console.error("Database connection failed:", err));

export default sequelize;
