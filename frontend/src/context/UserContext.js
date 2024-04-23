import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const login = (userData) => {
        // Perform login logic and set user
        setUser(userData);
    };

    const logout = () => {
        // Perform logout logic and unset user
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};


// const login = async (credentials) => {
//     try {
//         // Replace `sendLoginRequest` with your actual login request function
//         const { userData, token } = await sendLoginRequest(credentials);
//         if (token) {
//             // Optionally store the token for persistent login sessions
//             localStorage.setItem('authToken', token);
//         }
//         setUser(userData);
//     } catch (error) {
//         console.error("Login failed:", error);
//         // Handle error (e.g., show error message to user)
//     }
// };

// const logout = () => {
//     // Optionally, inform the backend about the logout
//     sendLogoutRequest(); // Placeholder, replace with your actual request function
//     // Clear the token from local storage
//     localStorage.removeItem('authToken');
//     // Reset the user state
//     setUser(null);
// };

