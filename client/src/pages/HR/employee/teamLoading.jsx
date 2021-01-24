import React from "react";
import { Skeleton } from "antd";

class teamLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { loading } = this.props;
        return (
            <div>
                {[...Array(4)].map((d, i) => {
                    return (
                        <Skeleton key={i} loading={loading} active></Skeleton>
                    );
                })}
            </div>
        );
    }
}

export default teamLoading;
