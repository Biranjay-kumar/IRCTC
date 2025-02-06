import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./src/config/database.js";  // Import Sequelize instance
import v1Router from "./src/routes/index.js";
import rateLimit from "express-rate-limit";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const openapiPath = path.join(__dirname, 'openapi.json');
let openapiData;
try {
  openapiData = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
} catch (err) {
  console.error('Error reading OpenAPI file:', err.message);
  process.exit(1);
}


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiData));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, 
  legacyHeaders: false,  
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", v1Router);

// Root route for health check
app.get("/", (req, res) => {
  res.status(200).send("Backend is up and running");
});

app.get("*", (req, res) => {
  res.status(200).send("Route not found");
});

// Connect to Database and Start Server
(async () => {
  try {
    // Test the connection
    await sequelize.authenticate();  // Authenticate with the database
    console.log("Database connected successfully!");

    // Sync models (this ensures that models match the database schema)
    await sequelize.sync({ force: false });  // Set force to true in development if you need to drop and recreate tables

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1); // Exit process on DB connection failure
  }
})();
