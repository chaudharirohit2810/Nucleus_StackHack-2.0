import React from "react";
import { Card, Space, Row, Typography } from "antd";
import {
    MailFilled,
    PhoneFilled,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Text } = Typography;

const EmployeeCard = ({ employee, isVisibleList }) => {
    const IconsTextList = [
        {
            icon: MailFilled,
            text: employee.email,
            visible: isVisibleList.find(item => item === "email"),
        },
        {
            icon: PhoneFilled,
            text: employee.phone,
            visible: isVisibleList.find(item => item === "phone"),
        },
        {
            icon: TeamOutlined,
            text: employee.team,
            visible: isVisibleList.find(item => item === "team"),
        },
        {
            icon: UserOutlined,
            text: employee.role,
            visible: isVisibleList.find(item => item === "role"),
        },
    ];
    return (
        <Card
            title={employee.name}
            style={{
                maxWidth: 350,
                minWidth: 300,
                marginTop: 16,
                marginRight: 16,
            }}
        >
            <Space direction="vertical">
                {IconsTextList.map((item, index) => {
                    if (item.visible) {
                        return (
                            <Row
                                key={index}
                                align="middle"
                                style={{ fontSize: "16px" }}
                            >
                                <item.icon
                                    style={{
                                        marginRight: "8px",
                                    }}
                                />
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: "14px",
                                    }}
                                >
                                    {item.text}
                                </Text>
                            </Row>
                        );
                    } else {
                        return null;
                    }
                })}
                <Link to={`employeeDetails/${employee._id}`}>Details</Link>
            </Space>
        </Card>
    );
};

export default EmployeeCard;
