import React, { useState } from "react";
// import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./drawerMobile.css";
import Menu from "./menu";
import { Layout, Row, Col, Typography, Button, Drawer } from "antd";
const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const his = useHistory();

    const logoutDashboard = () => {
        localStorage.clear();
        his.replace("/");
    };

    return (
        <Header className="navbar" style={{ padding: "0px 1rem" }}>
            <Row justify="space-between">
                <Col>
                    <Row align="middle">
                        <Button
                            className="menu"
                            style={{
                                backgroundColor: "initial",
                                color: "#fff",
                                border: "none",
                                marginTop: "0.35rem"
                            }}
                            icon={<MenuOutlined />}
                            onClick={() => setVisible(true)}
                        />
                        <Title
                            style={{
                                color: "white",
                                marginTop: "1rem"
                            }}
                            level={3}
                        >
                            Nucleus
                        </Title>
                    </Row>
                </Col>
                <Col></Col>
                <Col>
                    <Button type="primary" danger onClick={logoutDashboard}>
                        Logout
                    </Button>
                    <Drawer
                        title="Menu"
                        placement="left"
                        onClose={() => setVisible(false)}
                        visible={visible}
                        bodyStyle={{ padding: "0px" }}
                    >
                        <Menu setVisible={setVisible} />
                    </Drawer>
                </Col>
            </Row>
        </Header>
    );
};
export default NavBar;