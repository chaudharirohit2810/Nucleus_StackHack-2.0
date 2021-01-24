import React from "react";
import { Form, Input, Button } from "antd";
import {
    UserOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = ({ onFinish }) => {
    return (
        <Form
            name="normal_login"
            style={{
                maxWidth: "700px",
                minWidth: "300px",
                marginTop: "1rem",
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                className="input__login__element"
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
                className="input__login__element"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!",
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    iconRender={visible =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item style={{ margin: "0" }}>
                <Button type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
            <Form.Item style={{ marginTop: "0.5rem", padding: "0" }}>
                <Link to="/">Are you an Employee? Login Here</Link>
            </Form.Item>
        </Form>
    );
};

export default Login;
