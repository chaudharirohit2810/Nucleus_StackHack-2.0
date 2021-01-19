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
        const id = localStorage.getItem("employeeID");
        // console.log(id)
        axios
            .get(`${backendURL}/employee/details/${id}`)
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
        if (this.state.loading) {
            return <h1>Loading.....</h1>;
        }
        const { user } = this.state;
        return <UserDetails user={user} />;
    }
}

export default Home;
