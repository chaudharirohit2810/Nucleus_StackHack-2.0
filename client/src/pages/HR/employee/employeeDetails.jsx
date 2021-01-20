import React, { useEffect, useState } from "react";
import { backendURL } from "../../../config";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserDetails from "../../components/userDetails";
import AttendanceCalendar from "../../components/attendanceCalendar";
import { Divider, Skeleton, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const EmployeeDetails = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [presentDays, setPresentDays] = useState([]);
    const username = props.match.params.username;
    const his = useHistory();
    useEffect(() => {
        const token = localStorage.getItem("hrtoken");
        // console.log(id);
        axios
            .get(`${backendURL}/employee/hrdetails`, {
                headers: {
                    hrtoken: token,
                    username: username,
                },
            })
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
            <ArrowLeftOutlined
                style={{
                    width: "30px",
                    height: "40px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={() => his.goBack()}
            />
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
