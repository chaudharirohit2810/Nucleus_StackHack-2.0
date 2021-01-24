import React from "react";
import "antd/dist/antd.css";
import { Tabs, message, Typography } from "antd";
import Login from "./Login";
import Register from "./Register";
import { backendURL } from "../../../config";
import axios from "axios";
import "./login.css";
import { UserOutlined, LoginOutlined, FormOutlined } from "@ant-design/icons";
const { Title } = Typography;

const { TabPane } = Tabs;

class EmployeeAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onFinish = values => {
        const key = "login";
        message.loading({ content: "Logging you in.....", key });
        axios
            .post(backendURL + "/employee/login", values)
            .then(res => {
                if (!res.data.error) {
                    // console.log(res.data.result);
                    message.success({
                        content: "Login Successful",
                        key,
                    });
                    localStorage.setItem(
                        "employeetoken",
                        String(res.data.result.token)
                    );
                    this.props.history.push("/employee/home");
                }
            })
            .catch(error => {
                message.error({ content: "Invalid credentials", key });
            });
    };

    register = values => {
        const key = "register";
        message.loading({ content: "Registering your account.....", key });
        axios
            .post(backendURL + "/employee/register", values)
            .then(res => {
                // console.log(res.data);
                message.success({ content: res.data.result, key });
            })
            .catch(error => {
                message.error({ content: "Username already exists!", key });
            });
    };

    render() {
        return (
            <div className="hero__main">
                <div className="hero__header equal__width">
                    <div>
                        <UserOutlined
                            style={{
                                fontSize: "60px",
                                textAlign: "center",
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "#121212",
                            }}
                        />
                        <Title className="hero__header__title">Nucleus</Title>
                        <Title className="hero__header__subtitle">
                            A HR Management App
                        </Title>
                    </div>
                </div>
                <div className="equal__width hero__login__form">
                    <Tabs size="large" style={{ width: "100%" }}>
                        <TabPane
                            tab={
                                <div>
                                    Login
                                    <LoginOutlined
                                        style={{
                                            marginLeft: "0.8rem",
                                        }}
                                    />
                                </div>
                            }
                            key="login"
                        >
                            <Login onFinish={this.onFinish} />
                        </TabPane>
                        <TabPane
                            key="register"
                            tab={
                                <div>
                                    Register
                                    <FormOutlined
                                        style={{
                                            marginLeft: "0.8rem",
                                        }}
                                    />
                                </div>
                            }
                        >
                            <Register onFinish={this.register} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default EmployeeAuth;
