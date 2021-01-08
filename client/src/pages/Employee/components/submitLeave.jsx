import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

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

export default class submitLeave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onChange = (dates, dateStrings) => {
        // console.log("From: ", dates[0], ", to: ", dates[1]);
        // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    };
    disabledDate = current => {
        // Can not select days before today and today
        return current && current < moment().endOf("day");
    };

    onFinish = values => {
        // console.log(values);
        const { range, reason } = values;
        // Date Object
        // can convert into string
        // decided on database fi   eld
        const startDate = range[0]._d;
        const endDate = range[1]._d;
        this.props.loadModal();
        this.props.showModal();
        this.props.handleAdd();
        this.props.loadModal();
    };
    render() {
        return (
            <div
                style={{
                    marginTop: "2rem",
                }}
            >
                <Form
                    {...layout}
                    name="Leave"
                    onFinish={this.onFinish}
                    style={{
                        marginTop: "2rem",
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={["range"]}
                        label="Leave Range"
                        wrapperCol={{ ...layout.wrapperCol }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <RangePicker
                            size="large"
                            disabledDate={this.disabledDate}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={this.onChange}
                        />
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
            </div>
        );
    }
}

// const submitLeave = () => {

//     return (
//         <div></div>
//     );
// };

// export default submitLeave;
