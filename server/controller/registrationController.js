import { connection } from "../server.js";
import nodemailer from "nodemailer";

export const registrationController = async (req, res) => {
  try {
    const { firstName, lastName, employeeCode, email, phone, department } =
      req.body;

    // Validations
    if (
      !firstName ||
      !lastName ||
      !email ||
      !employeeCode ||
      !phone ||
      !department
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const query = `SELECT * FROM employees WHERE email = ?`;
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error checking user existence:", err);
        return res.status(500).send({
          success: false,
          message: "Error in registration",
          error: err,
        });
      }

      if (results.length > 0) {
        return res
          .status(409)
          .send({ success: false, message: "User already exists" });
      }

      // Generate a random password
      const password = generateRandomPassword(8);

      // Insert user data into the database
      const insertQuery = `INSERT INTO employees (firstName, lastName, employeeCode, email, phone, department, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      connection.query(
        insertQuery,
        [firstName, lastName, employeeCode, email, phone, department, password],
        async (err, result) => {
          if (err) {
            console.error("Error inserting user data:", err);
            return res.status(500).send({
              success: false,
              message: "Error in registration",
              error: err,
            });
          }

          // Send email to the user
          const emailSubject = "Your New Account Information";
          const emailText = `Hello ${firstName} ${lastName},\n\nYour new account has been created.\n\nEmail: ${email}\nPassword: ${password}\n\nPlease login and update your password.\n\nThank you.`;
          await sendEmail(email, emailSubject, emailText);

          // Return success response
          res.status(201).send({
            success: true,
            message: "Registered Successfully",
            user: result,
          });
        }
      );
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res
      .status(500)
      .send({ success: false, message: "Error in registration", error: error });
  }
};

// Function to generate a random alphanumeric password of specified length
const generateRandomPassword = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};

// Function to send email
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gopikagopvr@gmail.com",
      pass: "odjp wwub pjtk gexa",
    },
  });

  const mailOptions = {
    from: "gopikagopvr@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
