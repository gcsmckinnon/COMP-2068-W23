import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../App";

const Logout = () => {
    axios.defaults.withCredentials = true;
    
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                await axios.post("/api/users/logout");
                setUser(null);
                navigate("/login");
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.error?.message || "An error occurred");
                navigate("/profile");
            }
        })();
    }, []);

    return null;
};

export default Logout;