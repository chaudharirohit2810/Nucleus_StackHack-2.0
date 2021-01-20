import React, { Component } from "react";
import { Typography, Tabs } from "antd";
import BonusTable from "./bonusTable";

const { Title } = Typography;
const { TabPane } = Tabs;

class Bonus extends Component {
    render() {
        return (
            <div>
                <Title level={2}>Bonus</Title>
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    style={{ marginBottom: 32 }}
                >
                    <TabPane tab="Lend" key="1">
                        Lend Bonus
                    </TabPane>
                    <TabPane tab="Requested" key="2">
                        <BonusTable />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Bonus;
