import FAQ from "./faq";
import Attendance from "./attendance";
import SubmitLeave from "./submitLeave";
import Home from "./home";

const Routes = [
    { route: "attendance", component: Attendance, name: "Attendance" },
    { route: "faq", component: FAQ, name: "FAQ" },
    { route: "leave", component: SubmitLeave, name: "Leaves" },
    { route: "home", component: Home, name: "Home" }
];

export default Routes;
