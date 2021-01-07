import React, { useState } from "react";
// import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./drawerMobile.css";
import Menu from "./menu";
import { Layout, Row, Col, Typography, Button, Drawer } from "antd";
const { Header } = Layout;
const { Title } = Typography;

const NavBar = ({ logoutDashboard }) => {
    const [visible, setVisible] = useState(false);
    return (
        <Header className="navbar">
            <Row justify="space-between">
                <Col>
                    <Row align="middle">
                        <Button
                            className="menu"
                            type="primary"
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
                        onClick={() => setVisible(false)}
                        onClose={() => setVisible(false)}
                        visible={visible}
                        bodyStyle={{ padding: "0px" }}
                    >
                        <Menu />
                    </Drawer>
                </Col>
                {/* <Col>
                    
                </Col> */}
            </Row>
        </Header>

        // </nav>
    );
};
export default NavBar;
