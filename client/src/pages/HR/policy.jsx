import React from "react";
import {
    Button,
    Layout,
    Space,
    Typography,
    message,
    Skeleton,
    Empty,
} from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { backendURL } from "../../config";

const { Title, Text } = Typography;
class Policy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            policyText: "",
            editPolicyText: false,
            saveLoad: false,
            loading: true,
        };
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`${backendURL}/policy/get`);
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
    handlePolicy = () => {
        this.setState({
            editPolicyText: !this.state.editPolicyText,
        });
    };
    handleTextArea = event => {
        this.setState({
            policyText: event.target.value,
        });
    };
    handleSavePolicy = () => {
        // if (this.state.policyText === "") {
        //     this.handlePolicy();
        //     return;
        // }
        this.setState({
            saveLoad: !this.state.saveLoad,
        });
        const data = {
            policyData: this.state.policyText,
        };
        axios
            .post(`${backendURL}/policy/add`, data)
            .then(response => {
                if (!response.data.error) {
                    this.setState({
                        saveLoad: !this.state.saveLoad,
                    });
                    message.success({ content: response.data.result });
                    this.handlePolicy();
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    this.setState({
                        saveLoad: !this.state.saveLoad,
                    });
                    const data = error.response.data;
                    message.error({ content: data.result });
                    this.handlePolicy();
                }
            });
    };
    render() {
        const { editPolicyText, policyText, saveLoad, loading } = this.state;
        return (
            <div>
                {editPolicyText ? (
                    <div
                        style={{
                            marginBottom: "1rem",
                        }}
                    >
                        <Button
                            onClick={this.handlePolicy}
                            danger
                            icon={<CloseOutlined />}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleSavePolicy}
                            type="primary"
                            style={{
                                marginLeft: "1rem",
                            }}
                            icon={<SaveOutlined />}
                            loading={saveLoad}
                        >
                            Save Policy
                        </Button>
                    </div>
                ) : policyText !== "" ? (
                    <Button
                        onClick={this.handlePolicy}
                        type="primary"
                        style={{
                            marginBottom: "1rem",
                        }}
                    >
                        Update Policy
                    </Button>
                ) : (
                    <div />
                )}

                <Layout>
                    <Title level={1}>Policies</Title>
                    {editPolicyText ? (
                        <TextArea
                            rows={20}
                            showCount
                            onChange={this.handleTextArea}
                            value={policyText}
                        />
                    ) : loading ? (
                        <Skeleton active />
                    ) : policyText !== "" ? (
                        <Space direction="vertical">
                            <Text>{policyText}</Text>
                        </Space>
                    ) : (
                        <Empty>
                            <Button
                                onClick={this.handlePolicy}
                                type="primary"
                                style={{
                                    marginBottom: "1rem",
                                }}
                            >
                                Add Policy
                            </Button>
                        </Empty>
                    )}
                </Layout>
            </div>
        );
    }
}

export default Policy;
