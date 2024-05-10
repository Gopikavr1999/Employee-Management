import { connection } from "../server.js";
// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check user
    const query = "SELECT * FROM employees WHERE email = ?";
    connection.query(query, [email], async (error, results, fields) => {
      if (error) {
        console.error("Error in querying user:", error);
        return res.status(500).send({
          success: false,
          message: "Error in login",
          error,
        });
      }
      if (results.length === 0) {
        return res.status(404).send({
          success: false,
          message: "Email is not registered",
        });
      }
      const user = results[0];
      const match = password === user.password;
      if (!match) {
        return res.status(400).send({
          success: false,
          message: "Invalid Password",
        });
      }

      res.status(200).send({
        success: true,
        message: "Login successful",
        user: {
          _id: user.id,
          firstname: user.firstName,
          lastname: user.lastName,
          employeecode: user.employeeCode,
          email: user.email,
          phone: user.phone,
          department: user.department,
          password: user.password,
          photoBase64: user.photoBase64,
        },
      });
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
