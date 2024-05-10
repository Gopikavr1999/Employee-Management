import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
import myRoutes from "./routes/myRoutes.js";

//config env
dotenv.config();

const app = express();
const port = 5000;

// Increase the maximum number of listeners for EventEmitter
process.setMaxListeners(15);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Middleware to parse incoming JSON data
app.use(express.json());

// Use the cors middleware to enable CORS
app.use(cors());

// Define your API routes and use route files
app.use("/api", myRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export the MySQL connection object
export { connection };
