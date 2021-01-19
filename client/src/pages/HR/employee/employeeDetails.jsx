import React, { useEffect, useState } from "react";
import { backendURL } from "../../../config";
import axios from "axios";
import UserDetails from "../../components/userDetails";

const EmployeeDetails = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const id = props.match.params.id;

        axios
            .get(`${backendURL}/employee/details/${id}`)
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);
    return (
        <>
            {loading ? (
                <h1>Loading....</h1>
            ) : (
                <>
                    <UserDetails user={user} />
                </>
            )}
        </>
    );
};

export default EmployeeDetails;
