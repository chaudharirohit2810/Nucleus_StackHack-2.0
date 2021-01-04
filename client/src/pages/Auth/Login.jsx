import React from "react";
import { Form, Input, Button } from "antd";
import {
    UserOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined
} from "@ant-design/icons";

const Login = ({ onFinish }) => {
    return (
        <Form
            name="normal_login"
            style={{
                maxWidth: "500px",
                minWidth: "300px"
            }}
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
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

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
