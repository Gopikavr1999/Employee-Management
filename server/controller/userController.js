import { connection } from "../server.js";

export const userController = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Query to fetch user data from MySQL table
    const query = "SELECT * FROM employees WHERE id = ?";

    // Execute the query with the user id as a parameter
    connection.query(query, [userId], (error, results, fields) => {
      if (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      if (results.length > 0) {
        // If user data found, sending the first row as user data
        res.status(200).json({ user: results[0] });
      } else {
        // If user not found, sending 404 Not Found response
        res.status(404).json({ message: "User not found" });
      }
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
