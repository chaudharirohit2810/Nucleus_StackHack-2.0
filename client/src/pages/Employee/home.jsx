import React from "react";
import axios from "axios";
import { Divider, Skeleton, Typography } from "antd";
import { backendURL } from "../../config";
import UserDetails from "../components/userDetails";
import CardLoading from "../HR/employee/cardLoading";
import EmployeeContainer from "../HR/employee/employeeContainer";

const { Title } = Typography;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoading: true,
            memberLoading: true,
            memberData: [],
            user: null,
            error: "",
        };
    }

    async componentDidMount() {
        let token = localStorage.getItem("employeetoken");
        // console.log(id)
        let team = "",
            username = "";
        try {
            const response = await axios.get(
                `${backendURL}/employee/details/`,
                {
                    headers: { employeetoken: token },
                }
            );
            team = response.data.team;
            username = response.data.username;
            this.setState({
                userLoading: false,
                user: response.data,
            });
        } catch (error) {
            this.setState({
                userLoading: false,
                error: error.message,
            });
        }
        try {
            if (team !== "" && team !== undefined && team !== null) {
                const response = await axios.get(
                    `${backendURL}/employee/getTeamMembers`,
                    {
                        headers: { team, username, employeetoken: token },
                    }
                );
                this.setState({
                    memberData: response.data.result,
                    memberLoading: false,
                });
            }
        } catch (error) {
            this.setState({
                memberLoading: false,
            });
        }
    }

    render() {
        const { user, memberData, memberLoading } = this.state;
        return (
            <div>
                <UserDetails user={user} loading={this.state.userLoading} />
                <div
                    style={{
                        marginTop: "2rem",
                    }}
                >
                    {memberLoading ? (
                        <Skeleton
                            active
                            loading={memberLoading}
                            paragraph={{ rows: 0 }}
                        />
                    ) : (
                        <>
                            <Title level={3}>Team Members</Title>
                            <Divider style={{ marginTop: "0" }} />
                        </>
                    )}
                    {!memberLoading ? (
                        <EmployeeContainer
                            employees={memberData}
                            detailsVisible={false}
                        />
                    ) : (
                        <CardLoading number={3} />
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
