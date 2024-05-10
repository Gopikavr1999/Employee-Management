import React, { useState } from "react";
import "../styles/modal.css";
import Upload from "./Upload";

const Modal = ({ isOpen, onClose, user, onSave }) => {

  const [editedUser, setEditedUser] = useState(user || {
    firstname: "",
    lastname: "",
    employeecode: "",
    email: "",
    phone: "",
    department: "",
    password:"",
    photoBase64: null,
  });  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
     
      if (selectedFile instanceof Blob) {

      // Initialize FileReader
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;

        setEditedUser({ ...editedUser, photoBase64: base64String });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.error("Selected file is not a Blob.");
    }
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
   
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={editedUser.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={editedUser.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="employeecode">Employee Code:</label>
            <input
              type="text"
              id="employeecode"
              name="employeecode"
              value={editedUser.employeecode}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Contact No:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editedUser.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={editedUser.department}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="p-pic">Profile Pic:</label>
            <Upload onFileChange={handleFileChange}  />
          </div>
          <div className="button-group">
            <button type="submit">Update</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
