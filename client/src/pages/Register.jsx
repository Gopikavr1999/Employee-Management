import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      employeeCode,
      email,
      phone,
      department,
    };
    console.log("data", data);
    try {
      // Register data
      const response = await axios.post("http://localhost:5000/api/register", data);

      console.log(response.data);
      navigate("/login")
    } catch (error) {
      console.error( error);
    }
  };
  return (
    <div className="form-container">
      <h1>Employee Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            id="exampleInputFirstName"
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            id="exampleInputLastName"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            className="form-control"
            id="exampleInputEcode"
            placeholder="Employee code"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="exampleInputPhone"
            placeholder="Enter Your Contact"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-control"
            id="exampleInputDepartment"
            placeholder="Department"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
