import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { DropDown, Password, Salary } from "./components";
import { backendURL } from "../../../../config";
import axios from "axios";

const salaries = {
    10000: "10000",
    100000: "100000",
    200000: "200000",
    300000: "300000",
};

const Register = ({ onFinish }) => {
    const [teams, setTeams] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(`${backendURL}/teamrole/`)
            .then(res => {
                setTeams(prev => (res.data.teams ? res.data.teams.data : prev));
                setRoles(prev => (res.data.roles ? res.data.roles.data : prev));
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
            });
    }, []);
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
            <DropDown options={teams} name="team" loading={loading} />
            <DropDown options={roles} name="role" loading={loading} />
            <Salary marks={salaries} name="salary" />

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
