import React from "react";
import { Layout, Row, Col, Typography, Button } from "antd";
const { Header } = Layout;
const { Title } = Typography;
const HeaderMain = ({ logout, title }) => {
    return (
        <Header>
            <Row justify="space-between">
                <Col>
                    <Title
                        style={{
                            color: "white",
                            marginTop: "1rem"
                        }}
                        level={3}
                    >
                        {title}
                    </Title>
                </Col>
                <Col>
                    <Button onClick={logout} type="primary" danger>
                        Logout
                    </Button>
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderMain;
