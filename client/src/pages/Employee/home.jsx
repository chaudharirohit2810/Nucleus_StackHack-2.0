import React from "react";
import axios from "axios";
import { backendURL } from "../../config";
import UserDetails from "../components/userDetails";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null,
            error: "",
        };
    }

    componentDidMount() {
        let token = localStorage.getItem("employeetoken");
        // console.log(id)
        axios
            .get(`${backendURL}/employee/details/`, {
                headers: { employeetoken: token },
            })
            .then(res => {
                // console.log(res);
                this.setState({
                    loading: false,
                    user: res.data,
                });
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.message,
                });
            });
    }

    render() {
        const { user } = this.state;
        return <UserDetails user={user} loading={this.state.loading} />;
    }
}

export default Home;
