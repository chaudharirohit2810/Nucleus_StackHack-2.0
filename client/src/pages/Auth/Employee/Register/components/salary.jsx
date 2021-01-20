import React from "react";
import { Form, Slider, Typography } from "antd";
const { Text } = Typography;

const Salary = ({ marks, name }) => {
    return (
        <>
            <Text style={{ fontWeight: "bold" }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}:
            </Text>
            <Form.Item
                name={name}
                style={{ margin: "0px 16px 16px 16px", padding: "0px 16px" }}
            >
                <Slider marks={marks} min={10000} max={300000} step={1000} />
            </Form.Item>
        </>
    );
};

export default Salary;
