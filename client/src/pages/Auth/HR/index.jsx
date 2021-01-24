import { message, Tabs, Typography } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React from "react";
import { backendURL } from "../../../config";
import Login from "./Login";
import Register from "./Register";
import { UserOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Title } = Typography;

class HRAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onFinish = values => {
        const key = "login";
        console.log("Entered");
        message.loading({ content: "Logging you in.....", key });
        axios
            .post(backendURL + "/hr/login", values)
            .then(res => {
                if (!res.data.error) {
                    // console.log(res.data.result);
                    message.success({
                        content: "Login Successful",
                        key,
                    });
                    localStorage.setItem(
                        "hrtoken",
                        String(res.data.result.token)
                    );
                    this.props.history.push("/hr/home");
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    message.error({ content: data.result, key });
                }
            });
    };

    register = values => {
        const key = "register";
        message.loading({ content: "Registering your account.....", key });
        axios
            .post(backendURL + "/hr/register", values)
            .then(res => {
                if (!res.data.error) {
                    // console.log(res.data);
                    message.success({ content: res.data.result, key });
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    message.error({ content: data.result, key });
                }
            });
        // console.log("User Registered: ", values);
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
                                color: "#fff",
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
                        <TabPane tab="Login" key="login">
                            <Login onFinish={this.onFinish} />
                        </TabPane>
                        <TabPane key="register" tab="Register">
                            <Register onFinish={this.register} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default HRAuth;
