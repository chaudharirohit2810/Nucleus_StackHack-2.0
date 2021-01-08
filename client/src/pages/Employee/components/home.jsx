import React from "react";
import axios from "axios";
import { backendURL } from "../../../config";
import { Typography, Layout, Space, Col } from "antd";
const { Title, Text } = Typography;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
            error: "",
        };
    }

    async componentDidMount() {
        const id = localStorage.getItem("employeeID");
        // console.log(id);
        try {
            const response = await axios.get(
                `${backendURL}/employee/details/${id}`
            );
            this.setState({
                loading: false,
                user: response.data,
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: error.message,
            });
        }
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading.....</h1>;
        }
        const { user } = this.state;
        return (
            <Layout>
                <Title level={2}>Personal Info</Title>
                <Layout.Content>
                    <Title level={4}>{user.name}</Title>
                    <Col>
                        <Space direction="horizontal">
                            <Text>Email : {user.email}</Text>
                            <Text>Phone : {user.phone}</Text>
                        </Space>
                    </Col>
                    <Col>
                        <Space direction="horizontal">
                            <Text>Team : {user.team}</Text>
                            <Text>Role : {user.role}</Text>
                        </Space>
                    </Col>
                </Layout.Content>
            </Layout>
        );
    }
}

export default Home;
