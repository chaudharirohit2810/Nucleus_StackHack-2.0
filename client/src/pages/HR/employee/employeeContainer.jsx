import React, { useState } from "react";
import { Row, Input, Select, Tag } from "antd";
import EmployeeCard from "./employeeCard";
import CardLoading from "./cardLoading";
import {
    SearchOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
const { Option } = Select;

function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
        <Tag
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
                paddingTop: "3px",
                paddingBottom: "3px",
                marginBottom: 5,
            }}
        >
            {value.charAt(0).toUpperCase() + value.slice(1)}
        </Tag>
    );
}

const EmployeeContainer = ({ employees, actionsVisible = true }) => {
    const [employeeList, setEmployeeList] = useState(employees);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState(["email", "phone", "team", "role"]);

    const options = [
        { icon: MailOutlined, name: "Email", value: "email" },
        { icon: PhoneOutlined, name: "Phone", value: "phone" },
        { icon: TeamOutlined, name: "Team", value: "team" },
        { icon: UserOutlined, name: "Role", value: "role" },
    ];

    const onSearch = e => {
        setLoading(true);
        let value = e.target.value;
        setEmployeeList(prev =>
            employees.filter(
                item =>
                    item["name"].toUpperCase().indexOf(value.toUpperCase()) > -1
            )
        );
        setLoading(false);
    };

    return (
        <>
            {actionsVisible ? (
                <Row>
                    <Input
                        prefix={
                            <SearchOutlined className="site-form-item-icon" />
                        }
                        placeholder="Search employee names"
                        style={{
                            minWidth: 200,
                            maxWidth: 400,
                            borderBottom: "1px solid",
                            borderRadius: "0",
                            marginRight: 16,
                            // border: "2px solid",
                        }}
                        onChange={onSearch}
                        bordered={false}
                    />

                    <Select
                        mode="multiple"
                        placeholder="Please select visible items"
                        onChange={value => {
                            setFilters(value);
                        }}
                        value={filters}
                        style={{
                            width: 300,
                            marginTop: 16,
                            borderBottom: "1px solid",
                            marginRight: 16,
                        }}
                        bordered={false}
                        tagRender={tagRender}
                    >
                        {options.map((item, index) => (
                            <Option
                                key={index}
                                value={item.value}
                                label={item.name}
                            >
                                <div className="demo-option-label-item">
                                    <item.icon style={{ marginRight: "8px" }} />
                                    {item.name}
                                </div>
                            </Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Sort By"
                        onChange={value => {
                            setLoading(true);
                            const newList = [...employees];
                            const sortedList = newList.sort((a, b) => {
                                var textA = a[value].toUpperCase();
                                var textB = b[value].toUpperCase();
                                return textA < textB
                                    ? -1
                                    : textA > textB
                                    ? 1
                                    : 0;
                            });
                            setEmployeeList(sortedList);
                            setLoading(false);
                        }}
                        style={{
                            width: 300,
                            marginTop: 16,
                            borderBottom: "1px solid",
                        }}
                        bordered={false}
                    >
                        <Option value="name" label="Name">
                            <div className="demo-option-label-item">
                                <UserOutlined style={{ marginRight: "8px" }} />
                                Name
                            </div>
                        </Option>
                        {options.map((item, index) => (
                            <Option
                                key={index}
                                value={item.value}
                                label={item.name}
                            >
                                <div className="demo-option-label-item">
                                    <item.icon style={{ marginRight: "8px" }} />
                                    {item.name}
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Row>
            ) : null}

            {loading ? (
                <CardLoading number={employees.length} />
            ) : (
                <Row>
                    {employeeList.map((item, index) => (
                        <EmployeeCard
                            employee={item}
                            key={index}
                            isVisibleList={filters}
                        />
                    ))}
                </Row>
            )}
        </>
    );
};

export default EmployeeContainer;
