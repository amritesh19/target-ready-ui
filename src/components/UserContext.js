import React, { createContext, useState } from "react";

const UserContext = createContext();


const UserProvider = ({ children }) => {
  let userStatus = localStorage.getItem('role');
    const [user, setUser] = useState(userStatus);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };


  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export { UserContext, UserProvider };
