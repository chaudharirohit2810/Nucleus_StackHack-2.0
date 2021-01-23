import React from "react";
import {
    DollarCircleFilled,
    MailFilled,
    PhoneFilled,
    EditTwoTone,
} from "@ant-design/icons";
import { Col, Row, Skeleton, Space, Typography, Tooltip } from "antd";
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
            isHR
        } = this.props;
        return (
            <div style={{ marginBottom: "2rem" }}>
                {loading ? (
                    <Skeleton active paragraph={{ rows: 2 }} />
                ) : (
                    <div>
                        <ProfileForm
                            buttonLoading={buttonLoading}
                            handleModal={handleModal}
                            modalVisible={modalVisible}
                            handleSubmit={handleSubmit}
                            user={user}
                        />
                        <Title level={3} style={{ marginBottom: "0" }}>
                            {user.name}
                            {isHR !== true ? <Tooltip title="Edit Profile" placement="right">
                                <EditTwoTone
                                    style={{
                                        marginLeft: "1.5rem",
                                        fontSize: "24px",
                                    }}
                                    color="#0000FF"
                                    onClick={handleModal}
                                />
                            </Tooltip>: null}
                            
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
                    </div>
                )}
            </div>
        );
    }
}

export default UserDetails;
