import React from "react";
import { Layout } from "antd";
import Menu from "./menu";

const { Sider } = Layout;

const DrawerTemp = () => {
    return (
        <Sider
            className="sidebar"
            breakpoint={"lg"}
            theme="light"
            collapsedWidth={0}
            trigger={null}
        >
            <Menu />
        </Sider>
    );
};

export default DrawerTemp;
