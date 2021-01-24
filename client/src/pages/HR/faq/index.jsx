import React, { useState, useEffect } from "react";
import {
    Button,
    Collapse,
    Typography,
    message,
    Skeleton,
    // List,
    Row,
    Empty,
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

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const hrtoken = localStorage.getItem("hrtoken");
        axios
            .get(`${backendURL}/faq/`, { headers: { hrtoken } })
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
                ) : faqs.length !== 0 ? (
                    <Button
                        type="primary"
                        style={{
                            marginBottom: "1.5rem",
                        }}
                        onClick={() => setModalVisible(true)}
                    >
                        Add FAQ
                    </Button>
                ) : (
                    <div />
                )}
            </Row>

            {loading &&
                _.times(5, i => (
                    <div key={i} style={{ marginBottom: "2rem" }}>
                        <Skeleton
                            active
                            loading={loading}
                            title={{ width: "50%" }}
                            paragraph={{ rows: 1, width: "95%" }}
                        />
                    </div>
                ))}
            {!loading ? (
                faqs.length !== 0 ? (
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
                ) : (
                    <Empty description="No FAQs Added">
                        <Button
                            type="primary"
                            style={{
                                marginBottom: "1.5rem",
                            }}
                            onClick={() => setModalVisible(true)}
                        >
                            Add FAQ
                        </Button>
                    </Empty>
                )
            ) : (
                <div />
            )}
        </div>
    );
};

export default FAQ;
