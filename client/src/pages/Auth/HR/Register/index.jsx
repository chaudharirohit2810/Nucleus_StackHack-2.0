import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Password } from "./components";

const { Title } = Typography;

const Register = ({ onFinish }) => {
    return (
        <Form
            name="normal_login"
            style={{
                maxWidth: "700px",
                minWidth: "300px",
            }}
            initialValues={{
                remember: true,
            }}
            scrollToFirstError
            onFinish={onFinish}
        >
            <Title level={4}>Personal</Title>
            <Divider style={{ marginTop: "0" }} />
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <Form.Item
                    className="input__element"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    className="input__element"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Name"
                    />
                </Form.Item>
                <Form.Item
                    className="input__element"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Email"
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                    />
                </Form.Item>

                <Form.Item
                    className="input__element"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input addonBefore="+91" placeholder="Phone Number" />
                </Form.Item>
            </div>
            <Title level={4}>Password</Title>
            <Divider style={{ marginTop: "0" }} />
            <Password />

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
