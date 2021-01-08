import React from "react";
// import PropTypes from "prop-types";
import { Layout, Breadcrumb } from "antd";

import { Footer, Drawer, DrawerMobile } from "../pages/Employee/components";

const DefaultLayout = ({ children }) => {
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
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    {children}
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};

// DefaultLayout.propTypes = {
//   /**
//    * Whether to display the navbar, or not.
//    */
//   noNavbar: PropTypes.bool,
//   /**
//    * Whether to display the footer, or not.
//    */
//   noFooter: PropTypes.bool
// };

// DefaultLayout.defaultProps = {
//   noNavbar: false,
//   noFooter: false
// };

export default DefaultLayout;
