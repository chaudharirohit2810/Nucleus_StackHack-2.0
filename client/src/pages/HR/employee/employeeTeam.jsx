import React from "react";
import { Collapse, Row, Input } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import EmployeeContainer from "./employeeContainer";
import TeamLoading from "./teamLoading";

const { Panel } = Collapse;

const style = {
    background: "#f7f7f7",
    borderRadius: "2px",
    marginBottom: "24px",
    border: "0px",
    overflow: "hidden",
};

class employeeTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: this.props.employees,
            loading: false,
        };
    }
    groupBy = (list, keyGetter) => {
        const map = new Map();
        list.sort((a, b) => (keyGetter(a) > keyGetter(b) ? 1 : -1));
        list.forEach(item => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    };
    onSearch = e => {
        this.setState({
            loading: true,
        });
        const value = e.target.value;
        let employees = this.props.employees.filter(
            item => item["team"].toUpperCase().indexOf(value.toUpperCase()) > -1
        );
        this.setState({
            employees,
            loading: false,
        });
    };
    render() {
        const { employees, loading } = this.state;
        let finalEmployee = [];
        return (
            <div>
                {this.groupBy(employees, employee => employee.team).forEach(
                    (data, key) => {
                        finalEmployee.push(
                            <Panel header={key} key={key} style={style}>
                                <EmployeeContainer
                                    actionsVisible={false}
                                    employees={data}
                                />
                            </Panel>
                        );
                    }
                )}
                <Row>
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        placeholder="Search Employee Teams"
                        style={{
                            borderBottom: "1px solid",
                            borderRadius: "0",
                            marginBottom: "1rem",
                        }}
                        onChange={e => this.onSearch(e)}
                        bordered={false}
                    />
                </Row>
                <TeamLoading loading={loading} />
                {!loading ? (
                    <Collapse
                        bordered={false}
                        // defaultActiveKey={["1"]}
                        expandIcon={({ isActive }) => (
                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        style={style}
                    >
                        {finalEmployee}
                    </Collapse>
                ) : null}
            </div>
        );
    }
}

export default employeeTeam;
