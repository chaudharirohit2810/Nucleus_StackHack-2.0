import { Button, Col, Radio, Row, Select, Typography } from "antd";
import React from "react";

const CalendarHeader = ({
    value,
    type,
    onChange,
    onTypeChange,
    markAttendance,
    buttonDisabled,
    isButtonVisible,
}) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
        current.month(i);
        months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
        monthOptions.push(
            <Select.Option className="month-item" key={`${index}`}>
                {months[index]}
            </Select.Option>
        );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
        options.push(
            <Select.Option key={i} value={i} className="year-item">
                {i}
            </Select.Option>
        );
    }
    return (
        <div style={{ padding: 8 }}>
            <Typography.Title level={4}>
                {months[month]} {String(year)}
            </Typography.Title>
            <Col>
                <Row gutter={16}>
                    <Col>
                        <Radio.Group
                            size="small"
                            onChange={e => onTypeChange(e.target.value)}
                            value={type}
                        >
                            <Radio.Button value="month">Month</Radio.Button>
                            <Radio.Button value="year">Year</Radio.Button>
                        </Radio.Group>
                    </Col>
                    <Col>
                        <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            className="my-year-select"
                            onChange={newYear => {
                                const now = value.clone().year(newYear);
                                onChange(now);
                            }}
                            value={String(year)}
                        >
                            {options}
                        </Select>
                    </Col>
                    <Col>
                        <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            value={String(month)}
                            onChange={selectedMonth => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                            }}
                        >
                            {monthOptions}
                        </Select>
                    </Col>
                </Row>
            </Col>
            {isButtonVisible && (
                <Col style={{ marginTop: "0.75rem" }}>
                    <Button
                        type="primary"
                        onClick={markAttendance}
                        disabled={buttonDisabled}
                    >
                        Mark Today's Attendance
                    </Button>
                </Col>
            )}
        </div>
    );
};

export default CalendarHeader;
