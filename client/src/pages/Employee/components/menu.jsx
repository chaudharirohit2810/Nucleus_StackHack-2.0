import React from "react";
import { Menu } from "antd";
import {
    // UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const MyMenu = () => {
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: "none",
            }}
        >
            <Menu.Item>
                <Link
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                    to="/employee/attendence"
                >
                    Attendance
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                    to="/employee/submitLeave"
                >
                    Mark Leave
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                    }}
                    to="/employee/faq"
                >
                    FAQs
                </Link>
            </Menu.Item>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
            >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default MyMenu;
