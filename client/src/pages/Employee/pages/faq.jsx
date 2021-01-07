import React from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const Header = ({ title }) => <h1>{title}</h1>;

const FAQ = ({ faqs }) => {
    return (
        <div>
            <Title level={2}>Frequently Asked Questions</Title>
            <Collapse defaultActiveKey={["1"]}>
                {faqs.map((item, index) => (
                    <Panel
                        header={<Header title={item.question} />}
                        key={index + 1}
                    >
                        <p style={{ paddingLeft: 24 }}>{item.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default FAQ;
