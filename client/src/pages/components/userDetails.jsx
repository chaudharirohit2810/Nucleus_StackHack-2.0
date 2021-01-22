import React from "react";
import {
    DollarCircleFilled,
    MailFilled,
    PhoneFilled,
    EditOutlined,
} from "@ant-design/icons";
import { Col, Row, Skeleton, Space, Typography, Button, Tooltip } from "antd";
import ProfileForm from "./profileForm";

const { Title, Text } = Typography;

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            user,
            loading,
            handleSubmit,
            handleModal,
            modalVisible,
            buttonLoading,
        } = this.props;
        return (
            <div style={{ marginBottom: "2rem" }}>
                {loading ? (
                    <Skeleton active paragraph={{ rows: 2 }} />
                ) : (
                    <>
                        <ProfileForm
                            buttonLoading={buttonLoading}
                            handleModal={handleModal}
                            modalVisible={modalVisible}
                            handleSubmit={handleSubmit}
                            user={user}
                        />
                        <Title level={3} style={{ marginBottom: "0" }}>
                            {user.name}
                            <Tooltip title="Edit Profile" placement="right">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    onClick={handleModal}
                                    style={{
                                        marginLeft: "2.5rem",
                                    }}
                                    icon={<EditOutlined />}
                                    size="large"
                                />
                            </Tooltip>
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
                                <Row
                                    align="middle"
                                    style={{ fontSize: "16px" }}
                                >
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
                                <Row
                                    align="middle"
                                    style={{ fontSize: "16px" }}
                                >
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
    }
}

export default UserDetails;
