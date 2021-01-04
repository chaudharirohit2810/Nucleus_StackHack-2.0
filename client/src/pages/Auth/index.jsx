import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import Login from "./Login";
import Register from "./Register";

const { TabPane } = Tabs;

const Auth = () => {
    const onFinish = values => {
        console.log("User Logged In: ", values);
    };

    const register = values => {
        console.log("User Registered: ", values);
    };

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingTop: "2rem"
            }}
        >
            <Tabs centered>
                <TabPane tab="Login" key="login">
                    <Login onFinish={onFinish} />
                </TabPane>
                <TabPane key="register" tab="Register">
                    <Register onFinish={register} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Auth;
