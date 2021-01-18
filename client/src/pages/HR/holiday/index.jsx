import React, { useState, useEffect } from "react";
import {
    Button,
    // Timeline,
    message,
    Skeleton,
    Empty,
    Typography,
    Row,
    // Divider,
} from "antd";
import AddHolidayModal from "./addHolidayModal";
import axios from "axios";
import { backendURL } from "../../../config";
import _ from "lodash";
import HolidayTimeline from "./holidayTimeline";
const { Title } = Typography;

const Holiday = () => {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [holidays, setHolidays] = useState([]);

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

    const handleSuccess = data => {
        setHolidays(prev => [...prev, data]);
        setModalVisible(false);
        message.success({ content: "New FAQ Added" });
    };

    const handleError = () => {
        setModalVisible(false);
        message.error({ content: "Holiday additon failed! Please try again" });
    };

    return (
        <div>
            <AddHolidayModal
                isModalVisible={isModalVisible}
                handleSuccess={handleSuccess}
                handleError={handleError}
                handleCancel={() => setModalVisible(false)}
            />
            <Title level={2}>Holidays</Title>

            <Row justify="end">
                {loading ? (
                    <div style={{ marginBottom: "1.5rem" }}>
                        <Skeleton.Button active />
                    </div>
                ) : holidays.length !== 0 ? (
                    <Button
                        type="primary"
                        style={{
                            marginBottom: "1.5rem",
                        }}
                        onClick={() => setModalVisible(true)}
                    >
                        Add Holiday
                    </Button>
                ) : null}
            </Row>

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
                (holidays.length !== 0 ? (
                    <HolidayTimeline holidays={holidays} />
                ) : (
                    <Empty description="No Holidays Added">
                        <Button
                            type="primary"
                            style={{
                                marginBottom: "1.5rem",
                            }}
                            onClick={() => setModalVisible(true)}
                        >
                            Add Holiday
                        </Button>
                    </Empty>
                ))}
        </div>
    );
};

export default Holiday;
