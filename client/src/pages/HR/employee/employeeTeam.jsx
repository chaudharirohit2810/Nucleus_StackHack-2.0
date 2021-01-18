import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import EmployeeContainer from "./employeeContainer";

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
        };
    }
    groupBy = (list, keyGetter) => {
        const map = new Map();
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
    render() {
        const { employees } = this.state;
        let finalEmployee = [];
        return (
            <div>
                {this.groupBy(employees, employee => employee.team).forEach(
                    (data, key) => {
                        finalEmployee.push(
                            <Panel header={key} key={key + 1} style={style}>
                                <EmployeeContainer
                                    actionsVisible={false}
                                    employees={data}
                                />
                                {/* {this.groupBy(data, d => d.name).forEach(
                                    (value, k) => {
                                        detailEmployee.push(
                                            <EmployeeCard
                                                employee={value[mapIndex++]}
                                                key={k}
                                                isVisibleList={[
                                                    "email",
                                                    "phone",
                                                    "team",
                                                    "role",
                                                ]}
                                            />
                                        );
                                    }
                                )} */}
                            </Panel>
                        );
                    }
                )}
                <Collapse
                    bordered={false}
                    defaultActiveKey={["1"]}
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    style={style}
                >
                    {finalEmployee}
                </Collapse>
            </div>
        );
    }
}

export default employeeTeam;
