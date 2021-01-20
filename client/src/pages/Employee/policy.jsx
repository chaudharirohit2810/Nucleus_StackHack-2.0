import React from "react";
import {
    // Button,
    Layout,
    Space,
    Typography,
    message,
    Skeleton,
    Empty,
} from "antd";
import axios from "axios";
import { backendURL } from "../../config";

const { Title, Text } = Typography;
class Policy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            policyText: "",
            loading: true,
        };
    }
    async componentDidMount() {
        try {
            const token = localStorage.getItem("employeetoken");

            const response = await axios.get(`${backendURL}/policy/get`, {
                headers: { employeetoken: token },
            });
            this.setState({
                policyText: response.data.result.policyData,
                loading: !this.state.loading,
            });
        } catch (error) {
            this.setState({
                policyText: "Something went wrong",
                loading: !this.state.loading,
            });
            message.error({ content: "Failed to fetch policy !" });
        }
    }
    render() {
        const { policyText, loading } = this.state;
        return (
            <div>
                <Layout>
                    <Title level={1}>Policies</Title>
                    {loading ? (
                        <Skeleton active />
                    ) : policyText !== undefined &&
                      policyText !== null &&
                      policyText !== "" ? (
                        <Space direction="vertical">
                            <Text>{policyText}</Text>
                        </Space>
                    ) : (
                        <Empty />
                    )}
                </Layout>
            </div>
        );
    }
}

export default Policy;
