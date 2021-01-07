import React from "react";
import { Layout, Breadcrumb } from "antd";

import { Header, Footer, Drawer, Attendance, SubmitLeave } from "./components";

const { Content } = Layout;

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

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
                    <Header logout={this.logoutDashboard} title={"Nucleus"} />
                    <Layout>
                        <Drawer
                            onCollapse={this.onCollapse}
                            collapsed={this.state.collapsed}
                        />
                        <Layout style={{ padding: "0 24px 24px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <Attendance />
                                <SubmitLeave />
                            </Content>
                            <Footer />
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default SiderDemo;
// ReactDOM.render(<SiderDemo />, mountNode);
