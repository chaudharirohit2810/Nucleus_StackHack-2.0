import React from "react";
import CalendarHeader from "../Employee/calendarHeader";

const AttendanceCalendar = ({ presentDays }) => {
    const dateFullCellRender = value => {
        const absentDates = [5, 7, 8, 9, 15, 18, 21, 23, 25];
        const presentDates = presentDays.filter(item => {
            const date = new Date(item);
        });
        var absentColor = "#ff1744";
        var presentColor = "#00e676";

        return (
            <div
                className="ant-picker-cell-inner"
                style={{
                    backgroundColor: presentDays.find(item => {
                        const date = new Date(item);
                        return (
                            date.getMonth() === value.month() &&
                            date.getFullYear() === value.year() &&
                            value.date() === date.getDate()
                        );
                    })
                        ? presentColor
                        : "#ececec",
                    width: "60%",
                    height: "30px",
                    margin: "0px auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "#121212",
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

    return (
        <Calendar
            dateFullCellRender={dateFullCellRender}
            monthCellRender={monthCellRender}
            fullscreen={false}
            headerRender={props => (
                <CalendarHeader
                    {...props}
                    markAttendance={markAttendance}
                    buttonDisabled={presentDays.find(item => {
                        const date = new Date(item);
                        const today = new Date();
                        return (
                            date.getDate() === today.getDate() &&
                            date.getFullYear() === today.getFullYear() &&
                            date.getMonth() === today.getMonth()
                        );
                    })}
                />
            )}
        />
    );
};

export default AttendanceCalendar;
