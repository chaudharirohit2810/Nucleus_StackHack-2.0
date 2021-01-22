import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Input, message } from "antd";
import { DropDown } from "../../Auth/Employee/Register/components";
import axios from "axios";
import { backendURL } from "../../../config";
const EmployeePromoteCard = ({
    isVisible,
    onPromoteUpdate,
    onPromoteCancel,
    data,
    teamLoading,
    teams,
    roles,
    username,
}) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleOk = value => {
        setLoading(true);
        axios
            .put(`${backendURL}/employee/promote`, value, {
                headers: {
                    hrtoken: localStorage.getItem("hrtoken"),
                    username: username,
                },
            })
            .then(res => {
                setLoading(false);
                message.success({ content: "Employee got promoted/demoted" });
                onPromoteUpdate(value);
            })
            .catch(err => {
                console.error(err.message);
                message.error({
                    content:
                        "Something went wrong! employee promotion/demotion failed",
                });

                setLoading(false);
            });
    };

    const onCancel = () => {
        form.resetFields();
        onPromoteCancel();
    };

    return (
        <Modal
            title="Promote/Demote Employee"
            visible={isVisible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    form="promoteEmployeeForm"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                >
                    Promote/Demote
                </Button>,
            ]}
        >
            <Form id="promoteEmployeeForm" form={form} onFinish={handleOk}>
                <DropDown
                    name="team"
                    loading={teamLoading}
                    options={teams}
                    style={{ width: "100%" }}
                    initialValue={data.team}
                />
                <DropDown
                    name="role"
                    loading={teamLoading}
                    options={roles}
                    initialValue={data.role}
                    style={{ width: "100%" }}
                />
                <Form.Item
                    name="salary"
                    initialValue={data.salary}
                    style={{
                        marginBottom: "1rem",
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please enter the name!`,
                        },
                    ]}
                >
                    <Input placeholder="salary" type="number" suffix={"Rs"} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EmployeePromoteCard;
