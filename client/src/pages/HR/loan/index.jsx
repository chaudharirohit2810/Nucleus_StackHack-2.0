import React, { Component } from "react";
import { Typography } from "antd";
import LoanTable from "./loanTable";

const { Title } = Typography;
class Loan extends Component {
    render() {
        return (
            <div>
                <Title level={2}>Loans</Title>
                <LoanTable />
            </div>
        );
    }
}

export default Loan;
