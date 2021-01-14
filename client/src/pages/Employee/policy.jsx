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
            const response = await axios.get(`${backendURL}/policy/get`);
            console.log(response);
            if (!response.data.error) {
                this.setState({
                    policyText: response.data.result.policyData,
                    loading: !this.state.loading,
                });
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                this.setState({
                    policyText: error.response.data.result,
                    loading: !this.state.loading,
                });
                message.error({ content: "Issue fetching Policy !" });
            }
            console.log(error.message);
        }
    }
    render() {
        const { policyText, loading } = this.state;
        return (
            <div>
                {console.log(policyText)}
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
