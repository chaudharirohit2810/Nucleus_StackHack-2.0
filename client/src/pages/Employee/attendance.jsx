import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendURL } from "../../config";
import AttendanceCalendar from "../components/attendanceCalendar";

const Attendance = () => {
    const [presentDays, setPresentDays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem("employeetoken");
        axios
            .get(`${backendURL}/attendance/`, {
                headers: { employeetoken: token },
            })
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

    return (
        <div>
            <div style={{ maxWidth: "80vw", margin: "0px auto" }}>
                <AttendanceCalendar
                    presentDays={presentDays}
                    setPresentDays={setPresentDays}
                    isButtonVisible={true}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default Attendance;
