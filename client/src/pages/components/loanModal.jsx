import React from "react";
import { Form, Input, Button, Layout, InputNumber } from "antd";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};

const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: "${label} is required!",
};

export default class LoanModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // onFinish = values => {
    //     // console.log(values);
    //     const { range, reason } = values;
    //     // Date Object
    //     // can convert into string
    //     // decided on database fi   eld
    //     const startDate = range[0]._d;
    //     const endDate = range[1]._d;
    //     this.props.loadModal();
    //     this.props.showModal();
    //     this.props.handleAdd();
    //     this.props.loadModal();
    // };
    render() {
        return (
            <Layout
                style={{
                    marginTop: "2rem",
                }}
            >
                <Form
                    {...layout}
                    name="Leave"
                    onFinish={this.props.onFinish}
                    style={{
                        marginTop: "2rem",
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={["amount"]}
                        label="Amount"
                        wrapperCol={{ ...layout.wrapperCol }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name={["reason"]}
                        label="Reason"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea
                            maxLength={200}
                            showCount={true}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button
                            disabled={this.props.modalLoading}
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
        );
    }
}
