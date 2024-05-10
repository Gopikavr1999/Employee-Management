import { connection } from "../server.js";

export const fetchDataController = async (req, res) => {
  console.log("Fetching data...");

  try {
    // Query to fetch data from the table
    const query = "SELECT * FROM employeedata.employees";

    // Execute the query
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("results", results);
      // Return the data
      console.log("Data fetched successfully.");
      res.json(results);
    });
  } catch (error) {
    console.error("Error in fetchDataController:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetchDataController",
      error: error.message,
    });
  }
};
