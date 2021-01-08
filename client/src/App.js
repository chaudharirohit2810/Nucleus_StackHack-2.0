import React from "react";
import Auth from "./pages/Auth";
import EmployeeLayout from "./pages/Employee";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { FAQ, Attendance, SubmitLeave } from "./pages/Employee/pages/pages";
import employeeRoutes from "./pages/Employee/pages";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Auth} />
                <EmployeeLayout>
                    {employeeRoutes.map((item, index) => (
                        <Route
                            exact
                            key={index}
                            path={`/employee/${item.route}`}
                            component={item.component}
                        />
                    ))}
                </EmployeeLayout>
            </Switch>
        </Router>
    );
}

export default App;
