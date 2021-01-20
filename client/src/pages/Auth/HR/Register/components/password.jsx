import React from "react";
import { Form, Input, Row } from "antd";
import {
    EyeTwoTone,
    EyeInvisibleOutlined,
    LockOutlined,
} from "@ant-design/icons";

const password = () => {
    return (
        <div>
            <Row>
                <Form.Item
                    className="input__element"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        iconRender={visible =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    className="input__element"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your Password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "The two password do not match!"
                                );
                            },
                        }),
                    ]}
                    dependencies={["password"]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        placeholder="Confirm Password"
                    />
                </Form.Item>
            </Row>
        </div>
    );
};

export default password;
