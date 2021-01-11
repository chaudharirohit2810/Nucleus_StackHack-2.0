import {
    Attendance,
    FAQ,
    Home,
    LeaveTable,
    Policy,
    Holiday,
} from "./pages/Employee";

import { Home as HRHome } from "./pages/HR";

export const EmployeeRoutes = [
    {
        path: "home",
        exact: true,
        component: Home,
    },
    {
        path: "attendence",
        exact: true,
        component: Attendance,
    },
    {
        path: "submitLeave",
        exact: true,
        component: LeaveTable,
    },
    {
        path: "faq",
        exact: true,
        component: FAQ,
    },
    {
        path: "policy",
        exact: true,
        component: Policy,
    },
    {
        path: "holiday",
        exact: true,
        component: Holiday,
    },
];

export const HRRoutes = [
    {
        path: "home",
        exact: true,
        component: HRHome,
    },
];
