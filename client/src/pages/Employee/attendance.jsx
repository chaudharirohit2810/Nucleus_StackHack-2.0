import React from "react";
import { Calendar, message } from "antd";
import CalendarHeader from "./calendarHeader";

const Attendance = () => {
    const dateFullCellRender = value => {
        const absentDates = [5, 7, 8, 9, 15, 18, 21, 23, 25];
        const presentDates = [6, 10, 11, 16, 17, 29, 30];
        var absentColor = "#ff1744";
        var presentColor = "#00e676";

        return (
            <div
                className="ant-picker-cell-inner"
                style={{
                    backgroundColor: absentDates.find(
                        item => item === value.date()
                    )
                        ? absentColor
                        : presentColor,
                    width: "60%",
                    height: "30px",
                    margin: "0px auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <div>
                    <span style={{ fontWeight: "bold" }}>{value.date()}</span>
                </div>
            </div>
        );
    };

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return null;
    }

    const markAttendance = () => {
        message.loading({
            content: "Marking Your Attendance....",
            key: "attendance",
        });

        setTimeout(() => {
            message.success({
                content: "Attendance marked",
                key: "attendance",
            });
        }, 1000);
    };

    return (
        <div style={{ maxWidth: "80vw", margin: "0px auto" }}>
            <Calendar
                dateFullCellRender={dateFullCellRender}
                monthCellRender={monthCellRender}
                fullscreen={false}
                headerRender={props => (
                    <CalendarHeader
                        {...props}
                        markAttendance={markAttendance}
                    />
                )}
            />
        </div>
    );
};

export default Attendance;
