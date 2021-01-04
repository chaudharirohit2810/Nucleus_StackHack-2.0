import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { DropDown, Password, Salary } from "./components";

const salaries = {
    10000: "10000",
    100000: "100000",
    200000: "200000",
    300000: "300000",
};

const TeamOptions = [
    {
        value: "team1",
        name: "Team 1",
    },
    {
        value: "team2",
        name: "Team 2",
    },
    {
        value: "team3",
        name: "Team 3",
    },
];

const RoleOptions = [
    {
        value: "role1",
        name: "Role 1",
    },
    {
        value: "role2",
        name: "Role 2",
    },
    {
        value: "role3",
        name: "Role 3",
    },
];

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
            <DropDown options={TeamOptions} name="team" />
            <DropDown options={RoleOptions} name="role" />
            <Salary marks={salaries} name="Salary" />

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
