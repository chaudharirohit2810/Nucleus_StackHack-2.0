import { Button, Timeline } from "antd";

function Holiday() {
    return (
        <div>
            <Button
                type="primary"
                style={{
                    marginBottom: "1.5rem",
                }}
            >
                Add Holiday
            </Button>
            <Timeline mode="right">
                <Timeline.Item label="2015-09-01">
                    Create a services
                </Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">
                    Solve initial network problems
                </Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">
                    Network problems being solved
                </Timeline.Item>
            </Timeline>
        </div>
    );
}

export default Holiday;
