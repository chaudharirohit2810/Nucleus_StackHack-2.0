import React from "react";
import { Menu } from "antd";
import {
    HomeOutlined,
    QuestionCircleOutlined,
    FormOutlined,
    TeamOutlined,
    SmileOutlined,
    InfoCircleOutlined,
    LaptopOutlined,
    FileTextOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const HRMenu = ({ setVisible }) => {
    const HRRoutes = [
        {
            title: "Home",
            path: "home",
            icon: <HomeOutlined />,
        },
        {
            title: "Leaves",
            path: "checkLeaves",
            icon: <FormOutlined />,
        },
        {
            title: "Payroll",
            icon: <LaptopOutlined />,
            content: [
                {
                    title: "Loans",
                    path: "loan",
                    icon: <FileTextOutlined />,
                },
                {
                    title: "Bonus",
                    path: "bonus",
                    icon: <MoneyCollectOutlined />,
                },
            ],
        },
        {
            title: "Teams and roles",
            path: "teamrole",
            icon: <TeamOutlined />,
        },
        {
            title: "Holidays",
            path: "holiday",
            icon: <SmileOutlined />,
        },
        {
            title: "FAQs",
            path: "faq",
            icon: <QuestionCircleOutlined />,
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
            {HRRoutes.map((data, index) => {
                if (!("content" in data)) {
                    return (
                        <Menu.Item icon={data.icon} key={data.path}>
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={`/hr/${data.path}`}
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
                                            to={`/hr/${d.path}`}
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

export default HRMenu;
