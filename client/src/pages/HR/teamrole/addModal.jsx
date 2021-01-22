import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { backendURL } from "../../../config";

const AddModal = ({
    isTeamModalVisible,
    addTeamSuccess,
    addTeamCancel,
    items,
    label,
}) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const handleOk = value => {
        setLoading(true);

        if (
            items.find(item => item.toLowerCase() === value.team.toLowerCase())
        ) {
            message.error({ content: `${label} already exists` });
            setLoading(false);
            onCancel();
        }
        const allTeams = [...items, value.team];
        const data = {
            data: allTeams,
        };
        const hrtoken = localStorage.getItem("hrtoken");
        axios
            .put(`${backendURL}/teamrole/${label}`, data, {
                headers: { hrtoken },
            })
            .then(res => {
                setLoading(false);
                form.resetFields();
                addTeamSuccess(value.team, label);
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
            });
    };

    const onCancel = () => {
        form.resetFields();
        addTeamCancel();
    };

    return (
        <Modal
            title={`Add new ${label}`}
            visible={isTeamModalVisible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    form="addTeamForm"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                >
                    Add
                </Button>,
            ]}
        >
            <Form id="addTeamForm" form={form} onFinish={handleOk}>
                <Form.Item
                    name="team"
                    style={{
                        marginBottom: "1rem",
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please enter the ${label} name!`,
                        },
                    ]}
                >
                    <Input placeholder={`${label}`} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddModal;
