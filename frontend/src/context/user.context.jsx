import React, { createContext, useState } from "react";
// Create the context
export const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optionally, you can add login/logout helpers here
//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


// export const useUser = () => {
//     return  useContext(UserContext);
// };
   
