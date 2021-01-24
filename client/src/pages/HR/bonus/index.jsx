import React, { Component } from "react";
import { Typography, Tabs, Divider, message } from "antd";
import BonusTable from "./bonusTable";
import LendForm from "./lendForm";
import { EditOutlined, FilterFilled } from "@ant-design/icons";
import axios from "axios";
import { backendURL } from "../../../config";

const { Title } = Typography;
const { TabPane } = Tabs;

class Bonus extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Employee Name",
                dataIndex: "name",
                // width: "15%",
                // editable: true,
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Status",
                dataIndex: "status",
                filters: [
                    { text: "Approve", value: "Approve", color: "red" },
                    { text: "Reject", value: "Reject" },
                    { text: "Pending", value: "Pending" },
                ],
                filterIcon: filtered => (
                    <FilterFilled
                        style={{
                            color: filtered ? "#1890ff" : "#9254de",
                            fontSize: "0.9rem",
                        }}
                    />
                ),
                render(text, record) {
                    return {
                        props: {
                            style: {
                                color:
                                    text === "Reject"
                                        ? "#e76f51"
                                        : text === "Approve"
                                        ? "#2a9d8f"
                                        : "#577590",
                            },
                        },
                        children: <b>{text}</b>,
                    };
                },
                onFilter: (value, record) => record.status.indexOf(value) === 0,
            },
            {
                title: "Bonus Amount",
                dataIndex: "amount",
                sorter: (a, b) => a.amount - b.amount,
                sortDirections: ["descend", "ascend"],
            },
            {
                title: "Reason",
                dataIndex: "reason",
            },
            {
                title: "Edit",
                dataIndex: "operation",
                fixed: "right",
                width: 80,
                render: (_, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <EditOutlined
                            onClick={() => this.handleEditModal(record.key)}
                            style={{ cursor: "pointer", fontSize: "1.3rem" }}
                        />
                    ) : null,
            },
        ];
        this.state = {
            dataSource: [],
            employeeData: {},
            editModalVisible: false,
            editIndex: "",
            status: "",
            loading: true,
            editModalLoading: false,
        };
    }

    async componentDidMount() {
        try {
            const token = localStorage.getItem("hrtoken");
            const response = await axios.get(
                `${backendURL}/bonus/getAllBonus`,
                {
                    headers: { hrtoken: token },
                }
            );
            const result = response.data.result;
            const dataSource = result.map((d, i) => {
                return {
                    key: i,
                    status: d.status,
                    reason: d.reason,
                    amount: d.amount,
                    name:
                        d.employeeData !== undefined
                            ? d.employeeData[0].name
                            : "",
                };
            });
            this.setState({
                employeeData: result,
                dataSource,
                loading: false,
            });
        } catch (error) {
            console.log(error.message);
            message.error({ content: "Something went wrong!" });
            this.setState({ loading: false });
        }
    }

    async componentDidUpdate() {
        try {
            const token = localStorage.getItem("hrtoken");
            const response = await axios.get(
                `${backendURL}/bonus/getAllBonus`,
                {
                    headers: { hrtoken: token },
                }
            );
            if (!response.data.error) {
                const result = response.data.result;
                if (result.length !== 0) {
                    const dataSource = result.map((d, i) => {
                        return {
                            key: i,
                            status: d.status,
                            reason: d.reason,
                            amount: d.amount,
                            name:
                                d.employeeData !== undefined
                                    ? d.employeeData[0].name
                                    : "",
                        };
                    });
                    this.setState({
                        employeeData: result,
                        dataSource,
                        loading: false,
                    });
                }
            } else {
                console.log(response.data.result);
                message.error({ content: response.data.result });
                this.setState({ loading: false });
            }
        } catch (error) {
            console.log(error.message);
            if (error.response && error.response.data.error) {
                const data = error.response.data;
                message.error({ content: data.result });
            }
            this.setState({ loading: false });
        }
    }

    handleEditModal = key => {
        this.setState({
            editIndex: key,
            status: this.state.dataSource[key].status,
        });
        this.handleEditModalOpen();
    };

    handleEditSubmit = () => {
        if (this.state.editIndex === "") {
            this.handleEditModalOpen();
            return;
        }
        this.setState({
            editModalLoading: true,
        });
        let dataSource = [...this.state.dataSource];
        dataSource[Number(this.state.editIndex)]["status"] =
            this.state.status !== "" ? this.state.status : "Pending";
        const ID = this.state.employeeData[Number(this.state.editIndex)]._id;
        const status = this.state.status;
        const token = localStorage.getItem("hrtoken");
        axios
            .post(
                `${backendURL}/bonus/updateBonus`,
                { ID, status },
                { headers: { hrtoken: token } }
            )
            .then(response => {
                if (!response.data.error) {
                    message.success({ content: response.data.result });
                    this.setState({
                        dataSource,
                    });
                } else {
                    message.error({ content: response.data.result });
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    message.error({ content: data.result });
                }
            });
        this.setState({
            editModalLoading: false,
        });
        this.handleEditModalOpen();
    };

    handleEditModalOpen = () => {
        this.setState({
            editModalVisible: !this.state.editModalVisible,
        });
    };

    handleEditRadio = event => {
        this.setState({
            status: event.target.value,
        });
    };
    render() {
        const {
            dataSource,
            editModalVisible,
            editModalLoading,
            status,
            loading,
        } = this.state;
        return (
            <div>
                <Title level={2}>Bonus</Title>
                <Divider style={{ marginTop: "0" }} />
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    style={{ marginBottom: 32 }}
                >
                    <TabPane tab="Requested" key="1">
                        <BonusTable
                            dataSource={dataSource}
                            editModalLoading={editModalLoading}
                            editModalVisible={editModalVisible}
                            status={status}
                            loading={loading}
                            handleEditModalOpen={this.handleEditModalOpen}
                            handleEditSubmit={this.handleEditSubmit}
                            handleEditRadio={this.handleEditRadio}
                            propsColumns={this.columns}
                        />
                    </TabPane>
                    <TabPane tab="Lend Bonus" key="2">
                        <LendForm />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Bonus;
