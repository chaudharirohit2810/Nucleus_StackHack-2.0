import React from "react";
import { Table, Modal, Button, Radio, message } from "antd";
import { EditOutlined, FilterFilled } from "@ant-design/icons";
import axios from "axios";
import { backendURL } from "../../../config";

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
};

class LoanTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Employee Name",
                dataIndex: "name",
                // width: 100,
                // editable: true,
                // fixed: "left",
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
                title: "Loan Amount",
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
        };
    }

    async componentDidMount() {
        try {
            const token = localStorage.getItem("hrtoken");
            const response = await axios.get(`${backendURL}/loan/getAllLoans`, {
                headers: { hrtoken: token },
            });
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
            this.setState({ loading: false });
            if (error.response && error.response.data.error) {
                const data = error.response.data;
                message.error({ content: data.result });
            }
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
                `${backendURL}/loan/updateLoan`,
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
        const { dataSource, editModalVisible, editModalLoading } = this.state;
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
                    title="Edit Status"
                    visible={editModalVisible}
                    onCancel={this.handleEditModalOpen}
                    footer={[
                        <Button key="back" onClick={this.handleEditModalOpen}>
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={editModalLoading}
                            onClick={this.handleEditSubmit}
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Radio.Group
                        onChange={this.handleEditRadio}
                        value={this.state.status}
                    >
                        <Radio style={radioStyle} value={"Approve"}>
                            Approve
                        </Radio>
                        <Radio style={radioStyle} value={"Reject"}>
                            Reject
                        </Radio>
                        <Radio style={radioStyle} value={"Pending"}>
                            Pending
                        </Radio>
                    </Radio.Group>
                </Modal>
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

export default LoanTable;
