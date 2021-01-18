import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Form, Modal, message } from "antd";
import SubmitLeave from "./submitLeave";
import axios from "axios";
import { backendURL } from "../../config";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class LeaveTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "Reason",
                dataIndex: "reason",
                width: "30%",
                // editable: true,
            },
            {
                title: "Status",
                dataIndex: "status",
            },
            {
                title: "Start Date",
                dataIndex: "startDate",
            },
            {
                title: "End Date",
                dataIndex: "endDate",
            },
            // {
            //     title: "operation",
            //     dataIndex: "operation",
            //     render: (_, record) =>
            //         this.state.dataSource.length >= 1 ? (
            //             <Popconfirm
            //                 title="Sure to delete?"
            //                 onConfirm={() => this.handleDelete(record.key)}
            //             >
            //                 <span style={{ color: "red", cursor: "pointer" }}>
            //                     Delete
            //                 </span>
            //             </Popconfirm>
            //         ) : null,
            // },
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
        };
    }

    async componentDidMount() {
        try {
            let employeeid = "";
            if (localStorage.getItem("employeeID") !== null) {
                employeeid = localStorage.getItem("employeeID");
            }
            const response = await axios.get(
                `${backendURL}/leave/getByEmployee`,
                {
                    headers: {
                        employeeid,
                    },
                }
            );
            if (!response.data.error) {
                const result = response.data.result;
                if (result.length !== 0) {
                    const dataSource = result.map((d, i) => {
                        return {
                            key: i + 1,
                            reason: d.reason,
                            status: d.status,
                            startDate: d.startDate,
                            endDate: d.endDate,
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
        const { reason, startDate, endDate, status, dataSource } = this.state;
        const newData = {
            key: dataSource.length + 1,
            reason,
            status,
            startDate,
            endDate,
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
        let employeeID = "";
        if (localStorage.getItem("employeeID") !== null) {
            employeeID = localStorage.getItem("employeeID");
        }
        const data = {
            employeeID,
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
            .post(`${backendURL}/leave/add`, data)
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
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
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

export default LeaveTable;
