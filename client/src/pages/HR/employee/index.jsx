import React from "react";
import { Tabs, Empty } from "antd";
import axios from "axios";
import { backendURL } from "../../../config";
import CardLoading from "./cardLoading";
import TeamLoading from "./teamLoading";
import EmployeeContainer from "./employeeContainer";
import EmployeeTeam from "./employeeTeam";
import EmployeeRole from "./employeeRole";

// const { Meta } = Card;
// const { Text, Title } = Typography;
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
            const token = localStorage.getItem("hrtoken");
            const response = await axios.get(`${backendURL}/employee/`, {
                headers: { hrtoken: token },
            });
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
                    defaultActiveKey="1"
                    size="large"
                    style={{ marginBottom: 32 }}
                >
                    <TabPane tab="All" key="1">
                        {loading ? (
                            <CardLoading number={4} />
                        ) : employees !== undefined &&
                          employees !== null &&
                          employees.length !== 0 ? (
                            <EmployeeContainer employees={employees} />
                        ) : (
                            <Empty />
                        )}
                    </TabPane>
                    <TabPane tab="Teams" key="2">
                        <TeamLoading loading={loading} />
                        {!loading ? (
                            employees !== undefined &&
                            employees !== null &&
                            employees.length !== 0 ? (
                                <EmployeeTeam employees={employees} />
                            ) : (
                                <Empty />
                            )
                        ) : null}
                    </TabPane>
                    <TabPane tab="Roles" key="3">
                        <TeamLoading loading={loading} />
                        {!loading ? (
                            employees !== undefined &&
                            employees !== null &&
                            employees.length !== 0 ? (
                                <EmployeeRole employees={employees} />
                            ) : (
                                <Empty />
                            )
                        ) : null}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default HRHome;
