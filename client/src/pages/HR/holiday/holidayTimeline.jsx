import { Divider, Tabs, Timeline, Typography } from "antd";
import React from "react";
const { Title } = Typography;
const { TabPane } = Tabs;

const HolidayTimeline = ({ holidays }) => {
    let items = [];
    let monthItems = [];

    var groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach(item => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    };

    return (
        <>
            {groupBy(holidays, holiday => holiday.year).forEach(
                (value, key) => {
                    monthItems = [];
                    items.push(
                        <TabPane tab={key} key={key}>
                            {groupBy(value, val => val.month).forEach(
                                (value, key) => {
                                    monthItems.push(
                                        <div key={key}>
                                            <Title
                                                level={5}
                                                style={{ marginTop: "0" }}
                                            >
                                                {key}
                                            </Title>
                                            <Divider
                                                style={{
                                                    marginTop: "0",
                                                }}
                                            />
                                            <Timeline mode="left">
                                                {value.map((item, index) => (
                                                    <Timeline.Item
                                                        key={index}
                                                        position="left"
                                                    >
                                                        <strong
                                                            style={{
                                                                marginRight:
                                                                    "0.5rem",
                                                            }}
                                                        >
                                                            {`${item.days}, ${item.dateNumber} ${item.month}`}
                                                            :
                                                        </strong>
                                                        {item.reason}
                                                    </Timeline.Item>
                                                ))}
                                            </Timeline>
                                        </div>
                                    );
                                }
                            )}
                            {monthItems}
                        </TabPane>
                    );
                }
            )}
            <Tabs>{items}</Tabs>
        </>
    );
};

export default HolidayTimeline;
