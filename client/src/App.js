import React from "react";
import EmployeeAuth from "./pages/Auth/Employee";
import HRAuth from "./pages/Auth/HR";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "./layout";
import { EmployeeRoutes, HRRoutes } from "./routes";
import withTracker from "./withTracker";

const EmployeeContainer = () => (
    <MainLayout type={1}>
        {EmployeeRoutes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={`/employee/${route.path}`}
                    exact={route.exact}
                    component={withTracker(props => {
                        return <route.component {...props} />;
                    })}
                />
            );
        })}
    </MainLayout>
);

const HRContainer = () => (
    <MainLayout type={2}>
        {HRRoutes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={`/hr/${route.path}`}
                    exact={route.exact}
                    component={withTracker(props => {
                        return <route.component {...props} />;
                    })}
                />
            );
        })}
    </MainLayout>
);

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={EmployeeAuth} />
                <Route exact path="/hr/login" component={HRAuth} />
                <Route path="/employee" component={EmployeeContainer} />
                <Route path="/hr" component={HRContainer} />
            </Switch>
        </Router>
    );
}

export default App;
