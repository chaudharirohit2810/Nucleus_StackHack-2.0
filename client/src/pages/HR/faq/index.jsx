import React, { useState, useEffect } from "react";
import {
    Button,
    Collapse,
    Typography,
    message,
    Skeleton,
    List,
    Row,
} from "antd";
import AddFAQModal from "./addFAQModal";
import axios from "axios";
import { backendURL } from "../../../config";
import _ from "lodash";

const { Panel } = Collapse;
const { Title } = Typography;

const Header = ({ title }) => <h1>{title}</h1>;

const FAQ = () => {
    const [loading, setLoading] = useState(true);
    const defaultFaq = [
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!",
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!",
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!",
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!",
        },
        {
            question:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, doloremque.",
            answer:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet officiis voluptates facere consectetur! Aliquid cumque, unde asperiores ab tenetur molestiae corporis velit eveniet, non quas animi voluptatibus, ipsa quos!",
        },
    ];

    const [faqs, setFaqs] = useState(defaultFaq);

    useEffect(() => {
        axios
            .get(`${backendURL}/faq/`)
            .then(res => {
                setFaqs(prev => [...prev, ...res.data]);
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);

    const [isModalVisible, setModalVisible] = useState(false);
    const handleModalSubmit = data => {
        setFaqs(prev => [...prev, data]);
        setModalVisible(false);
        message.success({ content: "New FAQ Added" });
    };

    const handleError = () => {
        setModalVisible(false);
        message.error({ content: "FAQ additon failed! Please try again" });
    };

    return (
        <div>
            <AddFAQModal
                handleSuccess={handleModalSubmit}
                handleCancel={() => setModalVisible(false)}
                isModalVisible={isModalVisible}
                handleError={handleError}
            />

            <Title level={2}>Frequently Asked Questions</Title>
            <Row justify="end">
                {loading ? (
                    <div style={{ marginBottom: "1.5rem" }}>
                        <Skeleton.Button active />
                    </div>
                ) : (
                    <Button
                        type="primary"
                        style={{
                            marginBottom: "1.5rem",
                        }}
                        onClick={() => setModalVisible(true)}
                    >
                        Add FAQ
                    </Button>
                )}
            </Row>

            {loading &&
                _.times(5, i => (
                    <div style={{ marginBottom: "2rem" }}>
                        <Skeleton
                            key={i}
                            active
                            loading={loading}
                            title={{ width: "50%" }}
                            paragraph={{ rows: 1, width: "95%" }}
                        />
                    </div>
                ))}
            {!loading && (
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
            )}
        </div>
    );
};

export default FAQ;
