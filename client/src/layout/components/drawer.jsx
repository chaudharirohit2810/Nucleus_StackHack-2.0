import React from "react";
import { Layout } from "antd";
import Menu from "./menuEmployee";
import MenuHR from "./menuHR";

const { Sider } = Layout;

const DrawerTemp = ({ type }) => {
    return (
        <Sider
            className="sidebar"
            breakpoint={"md"}
            theme="light"
            collapsedWidth={0}
            trigger={null}
        >
            {type == 1 ? (
                <Menu setVisible={item => item} />
            ) : (
                <MenuHR setVisible={item => item} />
            )}
        </Sider>
    );
};

export default DrawerTemp;
