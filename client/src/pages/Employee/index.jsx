import React from "react";
import { Layout, Breadcrumb } from "antd";
import { Redirect } from "react-router-dom";
import { Footer, Drawer, DrawerMobile } from "./components";

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout style={{ minHeight: "100vh" }}>
                    <DrawerMobile />
                    <Layout>
                        <Drawer />
                        <Layout style={{ padding: "0 24px 24px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ minHeight: "70.5vh" }}>
                                {this.props.children}
                            </div>
                            <Footer />
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default MainLayout;
