// import PropTypes from "prop-types";
import { Layout } from "antd";
import React from "react";
import { Drawer, DrawerMobile, Footer } from "./components";

const MainLayout = ({ children, type }) => {
    const { props } = children;
    function logoutDashboard() {
        if (localStorage.getItem("employeeEmail") !== null) {
            localStorage.removeItem("employeeEmail");
        }
        props.history.replace("/");
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <DrawerMobile logoutDashboard={logoutDashboard} type={type} />
            <Layout>
                <Drawer type={type} />
                <Layout
                    style={{
                        padding: "0 24px 24px",
                        minHeight: "80vh",
                        marginTop: "2rem",
                    }}
                >
                    {children}
                </Layout>
            </Layout>
            <Footer />
        </Layout>
    );
};

export default MainLayout;
