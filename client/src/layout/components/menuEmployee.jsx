import React, { useState } from "react";
import { Menu } from "antd";
import {
    HomeOutlined,
    LaptopOutlined,
    QuestionCircleOutlined,
    CheckOutlined,
    FormOutlined,
    SmileOutlined,
    InfoCircleOutlined,
    MoneyCollectOutlined,
    FileTextOutlined,
    DollarCircleOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";

const { SubMenu } = Menu;

const MyMenu = ({ setVisible }) => {
    const his = useHistory();
    const [path, setPath] = useState(his.location.pathname.split("/")[2]);

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
            title: "Payroll",
            icon: <MoneyCollectOutlined />,
            content: [
                {
                    title: "Request Loan",
                    path: "loan",
                    icon: <FileTextOutlined />,
                },
                {
                    title: "Request Bonus",
                    path: "bonus",
                    icon: <DollarCircleOutlined />,
                },
            ],
        },
        {
            title: "Holidays",
            path: "holiday",
            icon: <SmileOutlined />,
        },
        {
            title: "Support",
            icon: <LaptopOutlined />,
            content: [
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
            ],
        },
    ];
    return (
        <Menu
            defaultSelectedKeys={path}
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
