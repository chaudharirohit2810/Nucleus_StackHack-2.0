import React from "react";
import { Form, Slider } from "antd";

const Salary = ({ marks, name }) => {
    return (
        <Form.Item
            name={name}
            label={name}
            style={{ margin: "0px 16px 16px 16px" }}
        >
            <Slider marks={marks} min={10000} max={300000} step={1000} />
        </Form.Item>
    );
};

export default Salary;
