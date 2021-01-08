// import React from "react";
// import { Redirect } from "react-router-dom";
import { Employee } from "./layouts";

import {
    Attendance,
    FAQ,
    Home,
    LeaveTable,
} from "./pages/Employee"

export default [
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
