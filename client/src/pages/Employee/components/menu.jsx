import React from "react";
import { Menu } from "antd";
import {
    // UserOutlined,
    LaptopOutlined,
    // NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const MyMenu = () => {
    const employeeRoutes = [
        {
            title: "Home",
            path: "home",
        },
        {
            title: "Attendence",
            content: [
                {
                    title: "Attendence",
                    path: "attendence",
                },
                {
                    title: "Mark Leave",
                    path: "submitLeave",
                },
            ],
        },
        {
            title: "FAQs",
            path: "faq",
        },
    ];
    return (
        <Menu
            mode="inline"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: "none",
            }}
        >
            {employeeRoutes.map((data, index) => {
                if (!("content" in data)) {
                    return (
                        <Menu.Item key={index}>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/employee/${data.path}`}
                            >
                                {data.title}
                            </Link>
                        </Menu.Item>
                    );
                } else {
                    return (
                        <SubMenu
                            key={index}
                            icon={<LaptopOutlined />}
                            title={`${data.title}`}
                        >
                            {data.content.map((d, i) => {
                                return (
                                    <Menu.Item key={i}>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                            to={`/employee/${d.path}`}
                                        >
                                            {d.title}
                                        </Link>
                                    </Menu.Item>
                                );
                            })}
                        </SubMenu>
                    );
                }
            })}
        </Menu>
    );
};

export default MyMenu;
