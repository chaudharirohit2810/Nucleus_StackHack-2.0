import React, { useEffect, useState } from "react";
import { Calendar, message, Skeleton } from "antd";
import CalendarHeader from "../Employee/calendarHeader";
import axios from "axios";
import { backendURL } from "../../config";

const AttendanceCalendar = ({
    presentDays,
    setPresentDays,
    isButtonVisible,
    loading,
}) => {
    const [absentDays, setAbsentDays] = useState([]);
    const dateFullCellRender = value => {
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
                        : absentDays.find(item => {
                              const date = new Date(item);
                              return (
                                  date.getMonth() === value.month() &&
                                  date.getFullYear() === value.year() &&
                                  value.date() === date.getDate()
                              );
                          })
                        ? absentColor
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

    useEffect(() => {
        var minDate = Math.min(...presentDays);
        var dates = [];
        while (minDate < new Date().valueOf()) {
            var temp = presentDays.find(item => {
                var itemDate = new Date(item);
                var tempDate = new Date(minDate);
                return (
                    tempDate.getDate() === itemDate.getDate() &&
                    tempDate.getFullYear() === itemDate.getFullYear() &&
                    tempDate.getMonth() === itemDate.getMonth()
                );
            });
            if (!temp) {
                dates.push(minDate);
            }
            minDate += 8.64e7;
        }
        setAbsentDays(dates);
    }, [loading, presentDays]);

    const markAttendance = () => {
        message.loading({
            content: "Marking Your Attendance....",
            key: "attendance",
        });
        const data = {
            employeeId: localStorage.getItem("employeeID"),
            presentDays: [new Date().valueOf(), ...presentDays],
        };
        axios
            .post(`${backendURL}/attendance/`, data)
            .then(res => {
                console.log(res.data);
                setPresentDays(prev => [...prev, new Date().valueOf()]);
                message.success({
                    content: "Attendance marked",
                    key: "attendance",
                });
            })
            .catch(err => {
                message.error({
                    content: "Something went wrong! Please try again...",
                    key: "attendance",
                });
            });
    };

    return (
        <div>
            {loading ? (
                <Skeleton active loading={loading} />
            ) : (
                <Calendar
                    dateFullCellRender={dateFullCellRender}
                    monthCellRender={monthCellRender}
                    fullscreen={false}
                    headerRender={props => (
                        <CalendarHeader
                            {...props}
                            isButtonVisible={isButtonVisible}
                            markAttendance={markAttendance}
                            buttonDisabled={presentDays.find(item => {
                                const date = new Date(item);
                                const today = new Date();
                                return (
                                    date.getDate() === today.getDate() &&
                                    date.getFullYear() ===
                                        today.getFullYear() &&
                                    date.getMonth() === today.getMonth()
                                );
                            })}
                        />
                    )}
                />
            )}
        </div>
    );
};

export default AttendanceCalendar;
