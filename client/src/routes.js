import {
    Attendance,
    FAQ,
    Home,
    LeaveTable,
    Policy,
    Holiday,
    Loan,
    Bonus,
} from "./pages/Employee";

import {
    Home as HRHome,
    FAQ as HRFAQ,
    Policy as HRPolicy,
    Holiday as HRHoliday,
    Leaves as HRLeaves,
    TeamRole as HRTeamRole,
    EmployeeDetails as HREmployeeDetails,
} from "./pages/HR";

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
        path: "loan",
        exact: true,
        component: Loan,
    },
    {
        path: "bonus",
        exact: true,
        component: Bonus,
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
    {
        path: "checkLeaves",
        exact: true,
        component: HRLeaves,
    },
    {
        path: "faq",
        exact: true,
        component: HRFAQ,
    },
    {
        path: "policy",
        exact: true,
        component: HRPolicy,
    },
    {
        path: "holiday",
        exact: true,
        component: HRHoliday,
    },
    {
        path: "teamrole",
        exact: true,
        component: HRTeamRole,
    },
    {
        path: "employeeDetails/:username",
        exact: true,
        component: HREmployeeDetails,
    },
];
