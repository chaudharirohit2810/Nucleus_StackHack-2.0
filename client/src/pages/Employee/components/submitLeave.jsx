import React from "react";
import { Form, Input, Button, DatePicker, Typography } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Title } = Typography;

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
    };
    render() {
        return (
            <div
                style={{
                    marginTop: "2rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Title level={1}>Mark Leave</Title>
                </div>
                <Form
                    {...layout}
                    name="Leave"
                    onFinish={this.onFinish}
                    style={{
                        marginTop: "2rem",
                    }}
                    validateMessages={validateMessages}
                >
                    {/* <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Title> Mark Leave</Title>
                    </Form.Item> */}
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
                        <Button type="primary" htmlType="submit">
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
