import React from "react";
import { Table, Button, Modal, message } from "antd";
import LoanModal from "../components/loanModal";
import axios from "axios";
import { backendURL } from "../../config";

class Loan extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Loan Amount",
                dataIndex: "amount",
                width: "30%",
                // editable: true,
            },
            {
                title: "Reason",
                dataIndex: "reason",
            },
            {
                title: "Status",
                dataIndex: "status",
            },
        ];
        this.state = {
            dataSource: [],
            isOpen: false,
            modalLoading: false,
            employeeData: {},
            reason: "",
            amount: "",
            status: "Pending",
        };
    }

    async componentDidMount() {
        try {
            let token = localStorage.getItem("employeetoken");
            const response = await axios.get(
                `${backendURL}/loan/getLoansByID`,
                {
                    headers: {
                        employeetoken: token,
                    },
                }
            );
            if (!response.data.error) {
                const result = response.data.result;
                if (result.length !== 0) {
                    const dataSource = result.map((d, i) => {
                        return {
                            key: i + 1,
                            amount: d.amount,
                            reason: d.reason,
                            status: d.status,
                        };
                    });
                    this.setState({
                        employeeData: result,
                        dataSource,
                    });
                }
            } else {
                console.log(response.data.result);
            }
        } catch (error) {
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
        const { reason, amount, dataSource, status } = this.state;
        const newData = {
            key: dataSource.length + 1,
            reason,
            amount,
            status,
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
        const { reason, amount } = values;

        this.loadModal();
        this.showModal();
        let token = localStorage.getItem("employeetoken");
        const data = {
            reason,
            amount,
            status: "Pending",
        };
        this.setState({
            reason,
            amount,
            status: "Pending",
        });
        axios
            .post(`${backendURL}/loan/request`, data, {
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
                    title="Request Loan"
                    visible={this.state.isOpen}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={900}
                >
                    <LoanModal
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
                    Request Loan
                </Button>
                <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

export default Loan;
