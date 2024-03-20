import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import Cookies from "js-cookie";

const Login = () => {
    axios.defaults.withCredentials = true;
    
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { setUser: login } = useAuth();

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            const resp = await axios.post("/api/users/authenticate", user);

            login(resp.data);
            Cookies.set("user", JSON.stringify(resp.data));

            toast("User logged in successfully");
            navigate(`/profile`);
        } catch (error) {
            toast.error(error?.response?.data?.error?.message || "An error occurred");
        }
    };

    return (
        <div className="container">
            <PageTitle title="Login" />
            <h1>Login</h1>
            <hr className="my-3" />

            <form onSubmit={submitForm}>
                <div className="form-group my-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
