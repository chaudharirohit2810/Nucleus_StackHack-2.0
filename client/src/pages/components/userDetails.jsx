import { DollarCircleFilled, MailFilled, PhoneFilled } from "@ant-design/icons";
import { Col, Row, Skeleton, Space, Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

const UserDetails = ({ user, loading }) => {
    return (
        <div style={{ marginBottom: "2rem" }}>
            {loading ? (
                <Skeleton active paragraph={{ rows: 2 }} />
            ) : (
                <>
                    <Title level={3} style={{ marginBottom: "0" }}>
                        {user.name}
                    </Title>
                    <Title
                        level={5}
                        style={{ marginTop: "0" }}
                        type="secondary"
                    >
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
                            {user.salary && (
                                <Row
                                    align="middle"
                                    style={{ fontSize: "16px" }}
                                >
                                    <DollarCircleFilled
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
                                        {user.salary}
                                    </Text>
                                </Row>
                            )}
                        </Space>
                    </Col>
                </>
            )}
        </div>
    );
};

export default UserDetails;
