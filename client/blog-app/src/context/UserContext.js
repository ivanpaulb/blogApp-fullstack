import React, { createContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('bloguser')) || null
  );

  const saveUserCredentials = (token) => {
    try {
      const decoded = jwtDecode(token); 
      const userData = {
        token,
        userId: decoded.userId,
        username: decoded.username,
        isAdmin: decoded.isAdmin,
      };
  
      localStorage.setItem('bloguser', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      console.error('Failed to decode token:', err);
    }
  };

  const clearUserCredentials = () => {
    localStorage.removeItem('bloguser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUserCredentials, clearUserCredentials }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
