import React from "react";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Employee } from "./layouts";
import routes from "./routes";
import withTracker from "./withTracker";

const EmployeeContainer = () => (
    <Employee>
        {routes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                        return <route.component {...props} />;
                    })}
                />
            );
        })}
    </Employee>
);

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Auth} />
                <Route path="/employee" component={EmployeeContainer} />
            </Switch>
        </Router>
    );
}

export default App;
