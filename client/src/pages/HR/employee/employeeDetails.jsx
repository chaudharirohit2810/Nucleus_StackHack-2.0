import React, { useEffect, useState } from "react";
import { backendURL } from "../../../config";
import axios from "axios";
import UserDetails from "../../components/userDetails";
import AttendanceCalendar from "../../components/attendanceCalendar";
import { Divider, Skeleton, Typography } from "antd";

const { Title } = Typography;

const EmployeeDetails = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [presentDays, setPresentDays] = useState([]);
    const id = props.match.params.id;
    useEffect(() => {
        axios
            .get(`${backendURL}/employee/hrdetails/${id}`)
            .then(res => {
                setUser(res.data);

                setPresentDays(res.data.attendanceData.presentDays);
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);
    return (
        <>
            <UserDetails user={user} loading={loading} />
            <Divider style={{ marginTop: "0" }} />
            {loading ? (
                <Skeleton active paragraph={{ rows: 0 }} />
            ) : (
                <Title level={3}>Attendance</Title>
            )}

            <div style={{ maxWidth: "80vw" }}>
                <AttendanceCalendar
                    presentDays={presentDays}
                    setPresentDays={setPresentDays}
                    isButtonVisible={false}
                    loading={loading}
                />
            </div>
        </>
    );
};

export default EmployeeDetails;
