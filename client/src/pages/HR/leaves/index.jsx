import React, { Component } from "react";
import { Typography } from "antd";
import LeaveTable from "./leaveTable";

const { Title } = Typography;

class Leaves extends Component {
    render() {
        return (
            <div>
                <Title level={2}>Leaves</Title>
                <LeaveTable />
            </div>
        );
    }
}

export default Leaves;
