import React from "react";
import { Form, Select } from "antd";
const { Option } = Select;

const DropDown = ({ options, name, loading }) => (
    <Form.Item
        name={name}
        hasFeedback
        className="input__element"
        rules={[{ required: true, message: `Please select your ${name}!` }]}
    >
        <Select
            placeholder={`Please select a ${name}`}
            loading={loading}
            disabled={loading}
        >
            {options.map((item, index) => (
                <Option value={item} key={index}>
                    {item}
                </Option>
            ))}
        </Select>
    </Form.Item>
);

export default DropDown;
