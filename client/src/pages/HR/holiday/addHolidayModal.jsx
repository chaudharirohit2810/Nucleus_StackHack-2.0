import { Button, DatePicker, Form, Input, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { backendURL } from "../../../config";

const AddHolidayModal = ({
    isModalVisible,
    handleSuccess,
    handleCancel,
    handleError,
}) => {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleOk = data => {
        // setLoading(true);
        data = {
            ...data,
            date: data["date"]._d,
            month: months[data["date"].month()],
            year: data["date"].year(),
            dateNumber: data["date"].date(),
            days: days[data["date"].day()],
        };

        axios
            .post(backendURL + "/holidays/", data)
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
                    form="addHolidayForm"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form id="addHolidayForm" form={form} onFinish={handleOk}>
                <Form.Item
                    name="date"
                    rules={[
                        { required: true, message: "Please enter valid date" },
                    ]}
                >
                    <DatePicker placeholder="Holiday Date" />
                </Form.Item>
                <Form.Item
                    name="reason"
                    style={{
                        marginBottom: "1rem",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the reason!",
                        },
                    ]}
                >
                    <Input placeholder="Reason" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddHolidayModal;
