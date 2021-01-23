import React, { useEffect, useState } from "react";
import { backendURL } from "../../../config";
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserDetails from "../../components/userDetails";
import AttendanceCalendar from "../../components/attendanceCalendar";
import { Button, Divider, Skeleton, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import EmployeePromoteCard from "./employeePromoteCard";

const { Title } = Typography;

const EmployeeDetails = props => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [presentDays, setPresentDays] = useState([]);
    const [employeeModalVisible, setEmployeeModalVisible] = useState(false);
    const [teamLoading, setteamLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [roles, setRoles] = useState([]);

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
                setPresentDays(prev =>
                    res.data.attendanceData
                        ? res.data.attendanceData.presentDays
                        : prev
                );
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });

        axios
            .get(`${backendURL}/teamrole/`)
            .then(res => {
                setTeams(prev => (res.data.teams ? res.data.teams.data : prev));
                setRoles(prev => (res.data.roles ? res.data.roles.data : prev));
                setteamLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setteamLoading(false);
            });
    }, []);

    const onPromoteUpdate = value => {
        setUser(prev => ({
            ...prev,
            ...value,
        }));
        setEmployeeModalVisible(false);
    };

    const onPromoteCancel = () => {
        setEmployeeModalVisible(false);
    };

    return (
        <div>
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
            <UserDetails isHR={true} user={user} loading={loading} />
            {user && (
                <EmployeePromoteCard
                    isVisible={employeeModalVisible}
                    onPromoteCancel={onPromoteCancel}
                    onPromoteUpdate={onPromoteUpdate}
                    data={{
                        salary: user.salary,
                        team: user.team,
                        role: user.role,
                    }}
                    teamLoading={teamLoading}
                    teams={teams}
                    roles={roles}
                    username={username}
                />
            )}
            {loading ? (
                <Skeleton.Button
                    active
                    size="large"
                    style={{ width: "100%" }}
                />
            ) : (
                <Button
                    type="primary"
                    style={{ width: "175px", marginTop: "0" }}
                    onClick={() => setEmployeeModalVisible(true)}
                >
                    Promote/Demote
                </Button>
            )}
            <Divider />

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
        </div>
    );
};

export default EmployeeDetails;
