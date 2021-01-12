import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import axios from "axios";
import { backendURL } from "../../../config";
const { TextArea } = Input;
const AddFAQModal = ({
    isModalVisible,
    handleSuccess,
    handleCancel,
    handleError,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleOk = data => {
        setLoading(true);
        axios
            .post(backendURL + "/faq/", data)
            .then(res => {
                form.resetFields();
                setLoading(false);
                handleSuccess(data);
            })
            .catch(err => {
                console.log(err);
                form.resetFields();
                setLoading(false);
                handleError();
            });
    };

    const onCancel = () => {
        form.resetFields();
        handleCancel();
    };

    return (
        <Modal
            title="Add New FAQ"
            visible={isModalVisible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    form="addFaqForm"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form
                id="addFaqForm"
                form={form}
                onFinish={handleOk}
                initialValues={{ question: "", answer: "" }}
            >
                <Form.Item
                    name="question"
                    style={{
                        marginBottom: "1rem",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the question!",
                        },
                    ]}
                >
                    <Input placeholder="Question" />
                </Form.Item>
                <Form.Item
                    name="answer"
                    style={{ margin: "0" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the answer to a question!",
                        },
                    ]}
                >
                    <TextArea placeholder="Answer to a question" rows={5} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFAQModal;
