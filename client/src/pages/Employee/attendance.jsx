import React, { useState, useEffect } from "react";
import { Calendar, message, Skeleton } from "antd";
import CalendarHeader from "./calendarHeader";
import axios from "axios";
import { backendURL } from "../../config";

const Attendance = () => {
    const [presentDays, setPresentDays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const employeeID = localStorage.getItem("employeeID");
        axios
            .get(`${backendURL}/attendance/${employeeID}`)
            .then(res => {
                // console.log(res.data);
                setPresentDays(res.data.presentDays);
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);

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
                <div style={{ maxWidth: "80vw", margin: "0px auto" }}>
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
                                        date.getFullYear() ===
                                            today.getFullYear() &&
                                        date.getMonth() === today.getMonth()
                                    );
                                })}
                            />
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default Attendance;
