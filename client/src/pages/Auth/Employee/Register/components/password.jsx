import React from "react";
import { Form, Input } from "antd";
import {
    EyeTwoTone,
    EyeInvisibleOutlined,
    LockOutlined
} from "@ant-design/icons";

const password = () => {
    return (
        <div>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
                hasFeedback
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

            <Form.Item
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: "Please confirm your Password!"
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                "The two password do not match!"
                            );
                        }
                    })
                ]}
                dependencies={["password"]}
                hasFeedback
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Confirm Password"
                />
            </Form.Item>
        </div>
    );
};

export default password;
