import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Password } from "./components";

const Register = ({ onFinish }) => {
    return (
        <Form
            name="normal_login"
            style={{
                maxWidth: "500px",
                minWidth: "300px",
            }}
            initialValues={{
                remember: true,
            }}
            scrollToFirstError
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Please input your name!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Name"
                />
            </Form.Item>
            <Form.Item
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
                    prefix={<MailOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <Form.Item
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

            <Password />

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                >
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
