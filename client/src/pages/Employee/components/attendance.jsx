import React from "react";
import { Calendar } from "antd";

const Attendance = () => {
    const dateFullCellRender = value => {
        const absentDates = [5, 7, 8, 9, 15, 18, 21, 23, 25];
        const presentDates = [6, 10, 11, 16, 17, 29, 30];
        var absentColor = "#ff1744";
        var presentColor = "#00e676";

        return (
            <div
                className="ant-picker-cell-inner"
                // onClick={() => console.log(value.date())}
                style={{
                    backgroundColor: absentDates.find(
                        item => item === value.date()
                    )
                        ? absentColor
                        : presentColor,
                    width: "60%",
                    height: "30px",
                    margin: "0px auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}
            >
                <div>
                    <span style={{ fontWeight: "bold" }}>{value.date()}</span>
                </div>
            </div>
        );
    };

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    return (
        <div style={{ maxWidth: "80vw", margin: "0px auto" }}>
            <Calendar
                // dateCellRender={dateCellRender}
                dateFullCellRender={dateFullCellRender}
                monthCellRender={monthCellRender}
                fullscreen={false}
            />
        </div>
    );
};

export default Attendance;
