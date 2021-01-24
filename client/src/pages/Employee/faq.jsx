import React from "react";
import axios from "axios";
import { backendURL } from "../../config";
import { Collapse, Typography, Skeleton, Empty } from "antd";
import _ from "lodash";

const { Panel } = Collapse;
const { Title } = Typography;

const Header = ({ title }) => <h1>{title}</h1>;

class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            faqs: [],
            loading: true,
        };
    }
    async componentDidMount() {
        try {
            const token = localStorage.getItem("employeetoken");
            const response = await axios.get(`${backendURL}/faq/`, {
                headers: { employeetoken: token },
            });
            if (
                response !== undefined ||
                response !== null ||
                response.length !== 0
            ) {
                this.setState({
                    faqs: response.data,
                    loading: !this.state.loading,
                });
            } else {
                this.setState({
                    faqs: [],
                    loading: !this.state.loading,
                });
            }
        } catch (error) {
            console.log(error.message);
            this.setState({
                faqs: [],
                loading: !this.state.loading,
            });
        }
    }
    render() {
        const { faqs, loading } = this.state;
        return (
            <div>
                <Title level={2}>Frequently Asked Questions</Title>
                {loading ? (
                    _.times(5, i => (
                        <div key={i} style={{ marginBottom: "2rem" }}>
                            <Skeleton
                                active
                                loading={loading}
                                title={{ width: "50%" }}
                                paragraph={{ rows: 1, width: "95%" }}
                            />
                        </div>
                    ))
                ) : faqs.length !== 0 ? (
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
                    <Empty
                        style={{ marginTop: "2rem" }}
                        description="No FAQS Available"
                    />
                )}
            </div>
        );
    }
}

export default FAQ;
