// import React from "react";
// import { Redirect } from "react-router-dom";
import { Employee } from "./layouts";

import {
    Attendance,
    SubmitLeave,
    FAQ,
    Home,
    LeaveTable,
} from "./pages/Employee/components";
// import Auth from "./pages/Auth";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    // {
    //     path: "/",
    //     layout: ({ children }) => <div>{children}</div>,
    //     component: Auth,
    // },
    {
        path: "/employee/home",
        exact: true,
        layout: Employee,
        component: Home,
    },
    {
        path: "/employee/attendence",
        exact: true,
        layout: Employee,
        component: Attendance,
    },
    {
        path: "/employee/submitLeave",
        exact: true,
        layout: Employee,
        component: LeaveTable,
    },
    {
        path: "/employee/faq",
        exact: true,
        layout: Employee,
        component: FAQ,
    },
];
