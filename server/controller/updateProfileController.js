import { connection } from "../server.js";

// Update profile
export const updateProfileController = async (req, res) => {
  try {
    const {
      _id,
      firstname,
      lastname,
      employeecode,
      email,
      phone,
      department,
      password,
      photoBase64,
    } = req.body;

    if (password && password.length < 6) {
      return res.status(400).json({
        error: "Password is required and must be at least 6 characters long",
      });
    }

    let photoBase64Buffer = null;
    if (photoBase64) {
      photoBase64Buffer = Buffer.from(photoBase64.split(",")[1], "base64");
    }

    const query = `
      UPDATE employees 
      SET 
        firstName = ?,
        lastName = ?,
        employeeCode = ?,
        email = ?,
        phone = ?,
        department = ?,
        password = ?,
        photo = ?
      WHERE id = ?
    `;

    const values = [
      firstname.trim(),
      lastname.trim(),
      employeecode,
      email,
      phone,
      department,
      password,
      photoBase64Buffer,
      _id,
    ];

    connection.query(query, values, (error, results) => {
      if (error) {
        return res.status(500).json({ success: false, message: "Error updating user", error });
      }
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        updatedUser: results,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};
