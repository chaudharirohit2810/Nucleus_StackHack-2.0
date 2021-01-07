import React from "react";
import { Layout, Breadcrumb } from "antd";

import { Header, Footer, Drawer, Attendance, DrawerMobile } from "./components";
import { FAQ } from "./pages";

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    faqs = [
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        }
    ];

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    logoutDashboard = () => {
        if (localStorage.getItem("employeeEmail") !== null) {
            localStorage.removeItem("employeeEmail");
        }
        this.props.history.replace("/");
    };

    render() {
        return (
            <div>
                <Layout style={{ minHeight: "100vh" }}>
                    <DrawerMobile logoutDashboard={this.logoutDashboard} />
                    <Layout>
                        <Drawer />
                        <Layout style={{ padding: "0 24px 24px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ minHeight: "70.5vh" }}>
                                <FAQ faqs={this.faqs} />
                            </div>
                            <Footer />
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default SiderDemo;
