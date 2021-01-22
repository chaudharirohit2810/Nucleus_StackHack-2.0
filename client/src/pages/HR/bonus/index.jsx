import React, { Component } from "react";
import { Typography, Tabs, Divider } from "antd";
import BonusTable from "./bonusTable";
import LendForm from "./lendForm";

const { Title } = Typography;
const { TabPane } = Tabs;

class Bonus extends Component {
    render() {
        return (
            <div>
                <Title level={2}>Bonus</Title>
                <Divider style={{ marginTop: "0" }} />
                <Tabs
                    defaultActiveKey="1"
                    size="large"
                    style={{ marginBottom: 32 }}
                >
                    <TabPane tab="Requested" key="1">
                        <BonusTable />
                    </TabPane>
                    <TabPane tab="Lend Bonus" key="2">
                        <LendForm />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Bonus;
