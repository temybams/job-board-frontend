import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = React.createContext();

const UserContext = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState({ status: false, message: "" });
    const [user, setUser] = useState({});

    const handleFetchMe = async () => {
        setUserLoading(true);
        try {
            const token = localStorage.getItem('token');  
            if (!token) {
                throw new Error("No token found, please log in again.");
            }

            const response = await axios.get("http://localhost:3000/api/v1/auth/me", {
                headers: { Authorization: `Bearer ${token}` },  
            });

            setUserError(null);
            setUser(response?.data?.data);
     
        } catch (error) {
            setUserError({ status: true, message: error?.message || "Error fetching user" });
            setUser(null);
        }
        setUserLoading(false);
    };

    useEffect(() => {
        handleFetchMe();
    }, []);

    const passing = { userLoading, userError, user, handleFetchMe };
    return (
        <userContext.Provider value={passing}>{children}</userContext.Provider>
    );
};

const useUserContext = () => useContext(userContext);

export { useUserContext, UserContext };
