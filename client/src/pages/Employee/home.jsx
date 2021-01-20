import React from "react";
import axios from "axios";
import { Divider, Empty, Typography } from "antd";
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
                        headers: { team, username },
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
                    <Divider
                        style={{
                            border: "2rem",
                        }}
                        orientation="left"
                        plain
                    >
                        <Title level={3}>Team Members</Title>
                    </Divider>
                    {!memberLoading ? (
                        memberData !== undefined && memberData.length !== 0 ? (
                            <EmployeeContainer
                                employees={memberData}
                                detailsVisible={false}
                            />
                        ) : (
                            <Empty />
                        )
                    ) : (
                        <CardLoading number={3} />
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
