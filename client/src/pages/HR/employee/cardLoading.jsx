import React from "react";
import { Card, Avatar, Row, Col, Skeleton, Space } from "antd";
import _ from "lodash";
const { Meta } = Card;

const CardLoading = ({ number }) => {
    return (
        <>
            <Row>
                {_.times(number, i => (
                    <Card
                        key={i}
                        style={{
                            maxWidth: 350,
                            minWidth: 300,
                            marginTop: 16,
                            marginRight: 16,
                        }}
                        loading={true}
                    >
                        <Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                ))}
            </Row>
        </>
    );
};

export default CardLoading;
