import React from "react";
import Auth from "./pages/Auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Auth} />
                {routes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={withTracker(props => {
                                if (route.layout !== null) {
                                    return (
                                        <route.layout {...props}>
                                            <route.component {...props} />
                                        </route.layout>
                                    );
                                }
                            })}
                        />
                    );
                })}
            </Switch>
        </Router>
    );
}

export default App;
