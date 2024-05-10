// AuthContext.js
import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

// Create a new context for managing user authentication and data
const AuthContext = createContext();

// Create a provider component to manage the authentication state and user data
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
