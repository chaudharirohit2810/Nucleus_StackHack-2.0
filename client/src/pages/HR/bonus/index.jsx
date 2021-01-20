import React, { Component } from "react";
import { Typography } from "antd";
import BonusTable from "./bonusTable";

const { Title } = Typography;

class Bonus extends Component {
    render() {
        return (
            <div>
                <Title level={2}>Bonus</Title>
                <BonusTable />
            </div>
        );
    }
}

export default Bonus;
