import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { isArray } from "util";

const { SubMenu } = Menu;

const MyMenu = ({ setVisible }) => {
    const employeeItems = {
        Home: { name: "Home", route: "home" },
        Attendance: [
            { name: "Attendance", route: "attendance" },
            { name: "Leaves", route: "leave" }
        ],
        Company: [{ name: "FAQs", route: "faq" }]
    };

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: "none"
            }}
        >
            {Object.keys(employeeItems).map((key, index) => {
                if (isArray(employeeItems[key])) {
                    return (
                        <SubMenu key={key} title={key}>
                            {employeeItems[key].map(item => (
                                <Menu.Item key={item.name}>
                                    <Link
                                        to={`/employee/${item.route}`}
                                        onClick={() => setVisible(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    );
                } else {
                    const item = employeeItems[key];
                    return (
                        <Menu.Item key={item.name}>
                            <Link
                                to={`/employee/${item.route}`}
                                onClick={() => setVisible(false)}
                            >
                                {item.name}
                            </Link>
                        </Menu.Item>
                    );
                }
            })}
        </Menu>
    );
};

export default MyMenu;
