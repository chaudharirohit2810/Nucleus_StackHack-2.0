import React from "react";
import { Card, Typography, Tabs } from "antd";
import axios from "axios";
import { backendURL } from "../../../config";
import CardLoading from "./cardLoading";
import TeamLoading from "./teamLoading";
import EmployeeContainer from "./employeeContainer";
import EmployeeTeam from "./employeeTeam";

const { Meta } = Card;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

class HRHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            loading: true,
        };
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`${backendURL}/employee/`);
            this.setState({
                employees: response.data,
                loading: !this.state.loading,
            });
        } catch (error) {
            console.error(error.message);
            this.setState({
                loading: !this.state.loading,
            });
        }
    }
    render() {
        const { loading, employees } = this.state;
        return (
            <div>
                <Tabs
                    defaultActiveKey="2"
                    size="large"
                    style={{ marginBottom: 32 }}
                >
                    <TabPane tab="All" key="1">
                        {loading ? (
                            <CardLoading number={4} />
                        ) : (
                            <EmployeeContainer employees={employees} />
                        )}
                    </TabPane>
                    <TabPane tab="Teams" key="2">
                        <TeamLoading loading={loading} />
                        {!loading ? (
                            <EmployeeTeam employees={employees} />
                        ) : null}
                    </TabPane>
                    <TabPane tab="Roles" key="3">
                        Content of tab 3
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default HRHome;
