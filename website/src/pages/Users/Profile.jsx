import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useAuth } from "../../App";
import axios from "axios";

const Profile = () => {
    axios.defaults.withCredentials = true;

    const { id } = useParams();
    const { user: contextUser } = useAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const userResp = await axios.get(`/api/users/${id}`);
            setUser(userResp.data);
        };

        if (contextUser && contextUser.id === id) {
            setUser(contextUser);
        } else {
            fetchData();
        }
    }, [id]);

    return (
        <div className="container">
            <PageTitle title="Profile" />
            <h1>Profile</h1>
            {user.firstName ? <h2>{`Hello, ${user.firstName} ${user.lastName}!`}</h2> : null}

            <hr className="my-3" />
        </div>
    );
};

export default Profile;
