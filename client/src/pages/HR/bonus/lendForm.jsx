import React from "react";
import {
    Form,
    Input,
    Button,
    Layout,
    InputNumber,
    AutoComplete,
    Skeleton,
    Card,
    message,
} from "antd";
import axios from "axios";
import { backendURL } from "../../../config";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};

const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: "${label} is required!",
};

class LendForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitLoading: false,
            employeeDetails: [],
            employees: [],
            loading: true,
        };
    }

    async componentDidMount() {
        try {
            const hrtoken = localStorage.getItem("hrtoken");
            const response = await axios.get(`${backendURL}/employee/`, {
                headers: {
                    hrtoken,
                },
            });
            let details = response.data.map((d, index) => {
                return {
                    value: d.username,
                };
            });
            this.setState({
                employees: response.data,
                employeeDetails: details,
                loading: !this.state.loading,
            });
        } catch (error) {
            console.log(error.message);
            this.setState({
                loading: !this.state.loading,
            });
        }
    }

    onFinish = values => {
        this.setState({
            submitLoading: true,
        });
        const hrtoken = localStorage.getItem("hrtoken");
        const { employee, amount, reason } = values;
        let name = "";
        let employeeID = "";
        for (let i = 0; i < this.state.employees.length; i++) {
            if (this.state.employees[i]["username"] === employee) {
                employeeID = this.state.employees[i]["_id"];
                name = this.state.employees[i]["name"];
                break;
            }
        }
        // console.log(employeeID);
        const data = {
            employeeID,
            amount,
            reason,
            status: "Approve",
        };
        axios
            .post(`${backendURL}/bonus/lend`, data, {
                headers: {
                    hrtoken,
                },
            })
            .then(respnose => {
                if (!respnose.data.error) {
                    message.success({ content: respnose.data.result });
                }
                this.setState({
                    submitLoading: false,
                });
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    message.error({ content: data.result });
                }
                this.setState({
                    submitLoading: false,
                });
            });
    };
    render() {
        const { employeeDetails, loading } = this.state;
        return (
            <Layout
                style={{
                    marginTop: "2rem",
                }}
            >
                {loading ? (
                    <Skeleton active />
                ) : (
                    <Card title="Lend Bonus" bordered={true}>
                        <Form
                            {...layout}
                            name="Bonus"
                            onFinish={this.onFinish}
                            style={{
                                marginTop: "2rem",
                            }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                name={["employee"]}
                                label={"Employee"}
                                wrapperCol={{ ...layout.wrapperCol }}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <AutoComplete
                                    style={{ width: 250 }}
                                    options={employeeDetails}
                                    placeholder="Type Employee Username"
                                    filterOption={(inputValue, option) =>
                                        option.value
                                            .toUpperCase()
                                            .indexOf(
                                                inputValue.toUpperCase()
                                            ) !== -1
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name={["amount"]}
                                label={"Bonus Amount"}
                                wrapperCol={{ ...layout.wrapperCol }}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                            <Form.Item
                                name={["reason"]}
                                label="Reason"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    maxLength={200}
                                    showCount={true}
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
                            >
                                <Button
                                    loading={this.state.submitLoading}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                )}
            </Layout>
        );
    }
}

export default LendForm;
