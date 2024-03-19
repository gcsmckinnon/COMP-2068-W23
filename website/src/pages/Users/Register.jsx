import React, { useState } from "react";
import styles from "./Users.module.css";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const submitForm = async (event) => {
        event.preventDefault();

        try {
            await axios.post("/api/users", user);
            toast("User registered successfully");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.error?.message || "An error occurred");
        }
    };

    return (
        <div className="container">
            <PageTitle title="Register" />
            <h1>Register</h1>
            <hr className="my-3" />

            <form onSubmit={submitForm}>
                <div className="form-group my-3">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="nickname">Nickname</label>
                    <input type="text" className="form-control" id="nickname" name="nickname" onChange={(e) => setUser({ ...user, nickname: e.target.value })} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" className="form-control" id="avatar" name="avatar" onChange={(e) => setUser({ ...user, avatar: e.target.files[0] })} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
