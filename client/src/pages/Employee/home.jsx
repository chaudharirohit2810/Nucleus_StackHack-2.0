import React from "react";
import axios from "axios";
import { Divider, Skeleton, Typography, message } from "antd";
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
            modalVisible: false,
            buttonLoading: false,
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
    handleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };
    handleButtonLoading = () => {
        this.setState({
            buttonLoading: !this.state.buttonLoading,
        });
    };
    handleSubmit = values => {
        this.handleButtonLoading();
        let newUser = this.state.user;
        const { name, email, phone } = values;
        const employeetoken = localStorage.getItem("employeetoken");
        const data = {
            name,
            email,
            phone,
        };
        newUser.name = name;
        newUser.email = email;
        newUser.phone = phone;
        axios
            .post(`${backendURL}/employee/updateProfile`, data, {
                headers: { employeetoken },
            })
            .then(response => {
                this.handleButtonLoading();
                this.setState({
                    user: newUser,
                });
                this.handleModal();
                message.success({ content: response.data.result });
            })
            .catch(error => {
                this.handleButtonLoading();
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    message.error({ content: data.result });
                }
            });
    };

    render() {
        const {
            user,
            memberData,
            memberLoading,
            modalVisible,
            buttonLoading,
        } = this.state;
        return (
            <div>
                <UserDetails
                    handleModal={this.handleModal}
                    handleSubmit={this.handleSubmit}
                    user={user}
                    loading={this.state.userLoading}
                    modalVisible={modalVisible}
                    buttonLoading={buttonLoading}
                />
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
