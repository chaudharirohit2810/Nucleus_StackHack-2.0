import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
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
        axios
            .post(backendURL + "/employee/login", values)
            .then(res => {
                if (!res.data.error) {
                    console.log(res.data.result);
                    alert("Employee Login Success !");
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    alert(data.result);
                }
            });
        // console.log("User Logged In: ", values);
    };

    register = values => {
        axios
            .post(backendURL + "/employee/register", values)
            .then(res => {
                if (!res.data.error) {
                    // console.log(res.data);
                    alert(res.data.result);
                }
            })
            .catch(error => {
                if (error.response && error.response.data.error) {
                    const data = error.response.data;
                    alert(data.result);
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
                    paddingTop: "2rem",
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
