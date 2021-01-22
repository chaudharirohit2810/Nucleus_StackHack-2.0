import React from "react";
import { Form, Select } from "antd";
const { Option } = Select;

const DropDown = ({ options, name, loading, style, initialValue }) => (
    <Form.Item
        name={name}
        hasFeedback
        initialValue={initialValue ? initialValue : ""}
        className="input__element"
        style={style ? style : {}}
        rules={[{ required: true, message: `Please select a ${name}!` }]}
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
