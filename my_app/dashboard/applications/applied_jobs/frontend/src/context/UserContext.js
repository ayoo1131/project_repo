//UserContext.js - Use this context to share values between components without explicitly passing values between components
import React, { createContext, useState, useEffect } from 'react';

// Create the context object
export const UserContext = createContext(null);

// Create a provider component that wraps your app
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  // Fetch the username from your Flask API when the app loads
  useEffect(() => {
    fetch('/api/user-info', {
      method: 'GET',
      credentials: 'include', // Send cookies with request (important for Flask sessions)
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then((data) => {
        setUsername(data.username); // Save the username in state
      })
      .catch(() => {
        setUsername(null); // Clear username if there's an error
      });
  }, []);

  return (
    <UserContext.Provider value={{ username }}>
      {children}
    </UserContext.Provider>
  );
};
