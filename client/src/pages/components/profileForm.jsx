import React from "react";
import { Modal, Form, Button, Input } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

const ProfileForm = props => {
    const [form] = Form.useForm();

    const {
        buttonLoading,
        handleModal,
        modalVisible,
        handleSubmit,
        user,
    } = props;

    return (
        <Modal
            title="Edit Profile"
            visible={modalVisible}
            onCancel={handleModal}
            footer={[
                <Button key="cancel" onClick={handleModal}>
                    Cancel
                </Button>,
                <Button
                    form="Profile"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    loading={buttonLoading}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form id="Profile" form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    initialValue={user.name}
                    style={{
                        marginBottom: "1rem",
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please enter the name !`,
                        },
                    ]}
                >
                    <Input placeholder="Name" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    name="email"
                    initialValue={user.email}
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail !",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail !",
                        },
                    ]}
                >
                    <Input placeholder="Email" prefix={<MailOutlined />} />
                </Form.Item>
                <Form.Item
                    name="phone"
                    initialValue={user.phone}
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input addonBefore="+91" placeholder="Phone Number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProfileForm;
