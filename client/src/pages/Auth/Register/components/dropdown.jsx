import React from "react";
import { Form, Select } from "antd";
const { Option } = Select;

const DropDown = ({ options, name }) => (
    <Form.Item
        name={name}
        hasFeedback
        rules={[{ required: true, message: `Please select your ${name}!` }]}
    >
        <Select placeholder={`Please select a ${name}`}>
            {options.map((item, index) => (
                <Option value={item.value} key={index}>
                    {item.name}
                </Option>
            ))}
        </Select>
    </Form.Item>
);

export default DropDown;
