import React from "react";
import "antd/dist/antd.css";
import { Tabs, message } from "antd";
import Login from "./Login";
import Register from "./Register";
import { backendURL } from "../../config";
import axios from "axios";

const { TabPane } = Tabs;

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onFinish = values => {
        const key = "login";
        message.loading({ content: "Logging you in.....", key });
        axios
            .post(backendURL + "/employee/login", values)
            .then(res => {
                if (!res.data.error) {
                    console.log(res.data.result);
                    message.success({
                        content: "Login Successful",
                        key
                    });
                    localStorage.setItem(
                        "employeeEmail",
                        res.data.result.email
                    );
                    localStorage.setItem("id", res.data.result._id);
                    this.props.history.push("/employee/home");
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    message.error({ content: data.result, key });
                }
            });
    };

    register = values => {
        const key = "register";
        message.loading({ content: "Registering your account.....", key });
        axios
            .post(backendURL + "/employee/register", values)
            .then(res => {
                if (!res.data.error) {
                    // console.log(res.data);
                    message.success({ content: res.data.result, key });
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    message.error({ content: data.result, key });
                }
            });
        // console.log("User Registered: ", values);
    };

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    paddingTop: "2rem"
                }}
            >
                <Tabs centered>
                    <TabPane tab="Login" key="login">
                        <Login onFinish={this.onFinish} />
                    </TabPane>
                    <TabPane key="register" tab="Register">
                        <Register onFinish={this.register} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Auth;

// const Auth = () => {
//     const onFinish = values => {
//         console.log("User Logged In: ", values);
//     };

//     const register = values => {
//         console.log("User Registered: ", values);
//     };

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 width: "100%",
//                 justifyContent: "center",
//                 paddingTop: "2rem"
//             }}
//         >
//             <Tabs centered>
//                 <TabPane tab="Login" key="login">
//                     <Login onFinish={onFinish} />
//                 </TabPane>
//                 <TabPane key="register" tab="Register">
//                     <Register onFinish={register} />
//                 </TabPane>
//             </Tabs>
//         </div>
//     );
// };

// export default Auth;
