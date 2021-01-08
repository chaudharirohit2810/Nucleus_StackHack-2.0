import React from "react";
// import PropTypes from "prop-types";
import { Layout, Breadcrumb } from "antd";

import { Footer, Drawer, DrawerMobile } from "./components";

const EmployeeLayout = ({ children }) => {
    const { props } = children;
    function logoutDashboard() {
        if (localStorage.getItem("employeeEmail") !== null) {
            localStorage.removeItem("employeeEmail");
        }
        props.history.replace("/");
    }
    
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <DrawerMobile logoutDashboard={logoutDashboard} />
            <Layout>
                <Drawer />
                <Layout style={{ padding: "0 24px 24px", minHeight: "80vh" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    {children}
                </Layout>
            </Layout>
            <Footer />
        </Layout>
    );
};



export default EmployeeLayout;
