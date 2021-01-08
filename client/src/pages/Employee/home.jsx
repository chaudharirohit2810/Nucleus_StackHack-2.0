import React from "react";
import axios from "axios";
import { backendURL } from "../../config";
import { Typography, Layout, Space, Col, Row } from "antd";
import { MailFilled, PhoneFilled } from "@ant-design/icons";
const { Title, Text } = Typography;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null,
            error: "",
        };
    }

    componentDidMount() {
        const id = localStorage.getItem("employeeID");
        // console.log(id)
        axios
            .get(`${backendURL}/employee/details/${id}`)
            .then(res => {
                // console.log(res);
                this.setState({
                    loading: false,
                    user: res.data,
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.message,
                });
            });
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading.....</h1>;
        }
        const { user } = this.state;
        return (
            <Layout>
                <Layout.Content>
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
                        </Space>
                    </Col>
                </Layout.Content>
            </Layout>
        );
    }
}

export default Home;
