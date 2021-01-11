import React from "react";
import { Menu } from "antd";
import {
    HomeOutlined,
    LaptopOutlined,
    QuestionCircleOutlined,
    CheckOutlined,
    FormOutlined,
    SmileOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const MyMenu = ({ setVisible }) => {
    const employeeRoutes = [
        {
            title: "Home",
            path: "home",
            icon: <HomeOutlined />,
        },
        {
            title: "Attendence",
            icon: <LaptopOutlined />,
            content: [
                {
                    title: "Attendence",
                    path: "attendence",
                    icon: <CheckOutlined />,
                },
                {
                    title: "Mark Leave",
                    path: "submitLeave",
                    icon: <FormOutlined />,
                },
            ],
        },
        {
            title: "FAQs",
            path: "faq",
            icon: <QuestionCircleOutlined />,
        },
        {
            title: "Holidays",
            path: "holiday",
            icon: <SmileOutlined />,
        },
        {
            title: "Policies",
            path: "policy",
            icon: <InfoCircleOutlined />,
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
                        <Menu.Item icon={data.icon} key={data.path}>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/employee/${data.path}`}
                                onClick={() => setVisible(false)}
                            >
                                {data.title}
                            </Link>
                        </Menu.Item>
                    );
                } else {
                    return (
                        <SubMenu
                            key={index}
                            icon={data.icon}
                            title={data.title}
                        >
                            {data.content.map((d, i) => {
                                return (
                                    <Menu.Item icon={d.icon} key={d.path}>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                            to={`/employee/${d.path}`}
                                            onClick={() => setVisible(false)}
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