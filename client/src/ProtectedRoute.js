import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import { backendURL } from "./config";
import { Skeleton } from "antd";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [credentialsValid, setCredentialsValid] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const verifyToken = () => {
            let token = localStorage.getItem("employeetoken");
            axios
                .post(`${backendURL}/employee/verify`, {
                    headers: { employeetoken: token },
                })
                .then(response => {
                    setCredentialsValid(response.data.result);
                    setValidated(true);
                })
                .catch(err => {
                    console.log(err);
                    setCredentialsValid(false);
                    setValidated(true);
                });
        };
        verifyToken();
    });
    if (credentialsValid && validated) {
        return (
            <Route
                {...rest}
                render={props => <Component {...rest} {...props} />}
            />
        );
    } else if (!credentialsValid && validated) {
        localStorage.clear();
        return <Redirect to="/" />;
    } else {
        return (
            <div>
                <Skeleton active />
            </div>
        );
    }
};

export default ProtectedRoute;
