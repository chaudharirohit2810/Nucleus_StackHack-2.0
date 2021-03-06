import React from "react";
import { Table, Button, Modal, message } from "antd";
import { FilterFilled } from "@ant-design/icons";
import SubmitLeave from "./submitLeave";
import axios from "axios";
import { backendURL } from "../../config";

class LeaveTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Reason",
                dataIndex: "reason",
                // width: 120,
                // editable: true,
                // fixed: "left",
            },
            {
                title: "Status",
                dataIndex: "status",
                filterIcon: filtered => (
                    <FilterFilled
                        style={{
                            color: filtered ? "#1890ff" : "#9254de",
                            fontSize: "0.9rem",
                        }}
                    />
                ),
                filters: [
                    { text: "Approve", value: "Approve", color: "red" },
                    { text: "Reject", value: "Reject" },
                    { text: "Pending", value: "Pending" },
                ],
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
                title: "Start Date",
                dataIndex: "startDate",
            },
            {
                title: "End Date",
                dataIndex: "endDate",
            },
        ];
        this.state = {
            dataSource: [],
            isOpen: false,
            modalLoading: false,
            employeeData: {},
            reason: "",
            startDate: "",
            endDate: "",
            status: "",
            loading: true,
        };
    }

    async componentDidMount() {
        try {
            let token = localStorage.getItem("employeetoken");
            const response = await axios.get(
                `${backendURL}/leave/getByEmployee`,
                {
                    headers: {
                        employeetoken: token,
                    },
                }
            );
            const result = response.data.result;
            if (result.length !== 0) {
                const dataSource = result.map((d, i) => {
                    return {
                        key: i + 1,
                        reason: d.reason,
                        status: d.status,
                        startDate: new Date(d.startDate).toUTCString(),
                        endDate: new Date(d.endDate).toUTCString(),
                    };
                });
                this.setState({
                    employeeData: result,
                    dataSource,
                    loading: false,
                });
            } else {
                this.setState({
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                loading: false,
            });
            console.log(error.message);
        }
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key),
        });
    };
    handleAdd = () => {
        const { reason, startDate, endDate, status, dataSource } = this.state;
        const newData = {
            key: dataSource.length + 1,
            reason,
            status,
            startDate: new Date(startDate).toUTCString(),
            endDate: new Date(endDate).toUTCString(),
        };
        this.setState({
            dataSource: [...dataSource, newData],
        });
    };
    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    showModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };
    loadModal = () => {
        this.setState({
            modalLoading: !this.state.modalLoading,
        });
    };

    handleCancel = () => {
        // console.log("Clicked cancel button");
        this.showModal();
    };

    onFinish = values => {
        // console.log(values);
        const { range, reason } = values;
        // Date Object
        // can convert into string
        // decided on database field
        const startDate = String(range[0]._d);
        const endDate = String(range[1]._d);
        this.loadModal();
        this.showModal();
        let token = localStorage.getItem("employeetoken");
        const data = {
            reason,
            status: "Pending",
            startDate: startDate,
            endDate: endDate,
        };
        this.setState({
            reason,
            startDate,
            endDate,
            status: "Pending",
        });
        axios
            .post(`${backendURL}/leave/add`, data, {
                headers: { employeetoken: token },
            })
            .then(response => {
                if (!response.data.error) {
                    this.handleAdd();
                    message.success({ content: response.data.result });
                    // console.log(response.data.result);
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    message.error({ content: error.response.data.result });
                }
                console.log(error.message);
            });

        this.loadModal();
    };

    render() {
        const { dataSource } = this.state;
        const components = {};
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Modal
                    title="Mark Leave"
                    visible={this.state.isOpen}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={900}
                >
                    <SubmitLeave
                        onFinish={this.onFinish}
                        modalLoading={this.state.modalLoading}
                    />
                </Modal>
                <Button
                    onClick={this.showModal}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Mark New Leave
                </Button>
                <Table
                    scroll={{
                        x: 500,
                    }}
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    loading={this.state.loading}
                />
            </div>
        );
    }
}

export default LeaveTable;
