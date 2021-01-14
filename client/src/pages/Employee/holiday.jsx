import React, { useEffect, useState } from "react";
import { Typography, Skeleton, Empty } from "antd";
import HolidayTimeline from "../HR/holiday/holidayTimeline";
import { backendURL } from "../../config";
import _ from "lodash";
import axios from "axios";

const { Title } = Typography;

function Holiday() {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(`${backendURL}/holidays/`)
            .then(res => {
                setHolidays(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <Title level={2}>Holidays</Title>
            {loading &&
                _.times(7, i => (
                    <div key={i}>
                        <Skeleton
                            active
                            loading={loading}
                            title={{ width: "80%" }}
                            paragraph={{ rows: 0 }}
                        />
                    </div>
                ))}
            {!loading &&
                (holidays.length != 0 ? (
                    <HolidayTimeline holidays={holidays} />
                ) : (
                    <Empty description="No Holidays Available" />
                ))}
        </div>
    );
}

export default Holiday;
