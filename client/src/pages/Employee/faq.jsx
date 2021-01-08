import React from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const Header = ({ title }) => <h1>{title}</h1>;

const FAQ = () => {
    const faqs = [
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!"
        }
    ];

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
