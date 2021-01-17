import React, { useEffect, useState } from "react";
import { Card, Typography, Tabs } from "antd";
import axios from "axios";
import { backendURL } from "../../../config";
import CardLoading from "./cardLoading";
import EmployeeContainer from "./employeeContainer";
const { Meta } = Card;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

const HRHome = () => {
    const [employees, SetEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(`${backendURL}/employee/`)
            .then(res => {
                SetEmployees(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);
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
                    ) : (
                        <EmployeeContainer employees={employees} />
                    )}
                </TabPane>
                <TabPane tab="Teams" key="2">
                    Content of tab 2
                </TabPane>
                <TabPane tab="Roles" key="3">
                    Content of tab 3
                </TabPane>
            </Tabs>
        </div>
    );
};

export default HRHome;
