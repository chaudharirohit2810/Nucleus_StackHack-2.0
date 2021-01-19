import React from "react";
import { Typography, Layout, Space, Col, Row } from "antd";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
const { Title, Text } = Typography;

const UserDetails = ({ user }) => {
    return (
        <Layout>
            <Layout.Content>
                <Title level={3} style={{ marginBottom: "0" }}>
                    {user.name}
                </Title>
                <Title level={5} style={{ marginTop: "0" }} type="secondary">
                    {user.role}
                </Title>
                <Col>
                    <Space direction="horizontal" size={32}>
                        <Row align="middle" style={{ fontSize: "16px" }}>
                            <MailFilled
                                style={{
                                    marginRight: "4px",
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: "14px",
                                }}
                            >
                                {user.email}
                            </Text>
                        </Row>
                        <Row align="middle" style={{ fontSize: "16px" }}>
                            <PhoneFilled
                                style={{
                                    marginRight: "4px",
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: "14px",
                                }}
                            >
                                {user.phone}
                            </Text>
                        </Row>
                    </Space>
                </Col>
            </Layout.Content>
        </Layout>
    );
};

export default UserDetails;
