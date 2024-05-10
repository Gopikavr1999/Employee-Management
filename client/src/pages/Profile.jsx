import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Table from "../components/Table";
import "../styles/profile.css";
import Modal from "../components/Modal";
import user1 from "../assets/user1.png";

const Profile = () => {
  const { user, logout  } = useAuth();

  const navigate = useNavigate()

  const [employees, setEmployees] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${user._id}`);
          setCurrentUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchData();
  
  }, [user]);
  
  
  //show all employees
  const handleFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fetchData");
      console.log(response.data);
      setEmployees(response.data);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };


  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleUpdate = async (editedUserData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/update",
        editedUserData
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleModalClose = () => {
    setShowEditModal(false);
  };

  const handleLogin = () => {
    navigate("/login")
  }
  if (!user) {
    return (
      <div className="welcome">
        <h2>User Profile</h2>
        <p>No user data available.</p>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  // Render user information if available
  return (
    <div>
      <div className="profile">
        <h2 className="name">
          {currentUser.photoBase64 !== null && currentUser.photoBase64 ? (
            <img
              src={`data:image/png;base64,${currentUser.photoBase64}`} 
              // alt={`${currentUser.firstname} ${currentUser.lastname}'s Photo`}
            />
          ) : (
            <img className="prof-pic" src={user1} alt="" />
          )}
          <span>
            {currentUser.firstName} {currentUser.lastName} - {currentUser.employeeCode}
          </span>
        </h2>
        <div className="user-info">
          <strong> {currentUser.email}</strong>
          <strong> {currentUser.phone}</strong>
          <strong> {currentUser.department} Department</strong>
        </div>
      </div>
      <div className="btn-sec">
      <button onClick={logout}>Log out</button>

      </div>
      <div className="welcome">
        <h2>Welcome to your profile !</h2>
      </div>

      <div className="btn-sec">
        <button onClick={handleFetchData}>Show all employees</button>
        <button onClick={handleEditProfile}>Edit Profile</button>
      </div>

      {showTable && (
        <Table
          head1="First Name"
          head2="Last Name"
          head3="Employee code"
          head4="Email"
          head5="Phone"
          head6="Department"
          datas={employees}
        />
      )}

      {showEditModal && (
        <div className="edit-modal">
          <Modal
            isOpen={showEditModal}
            onClose={handleModalClose}
            user={user}
            onSave={(editedUserData) => {
              handleModalClose();
              handleUpdate(editedUserData);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
