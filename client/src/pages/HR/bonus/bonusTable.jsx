import React from "react";
import { Table, Modal, Button, Radio } from "antd";

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
};

class BonusTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            dataSource,
            editModalVisible,
            editModalLoading,
            handleEditModalOpen,
            handleEditSubmit,
            handleEditRadio,
            status,
            propsColumns,
            loading,
        } = this.props;
        const components = {};
        const columns = propsColumns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    // handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Modal
                    title="Edit Status"
                    visible={editModalVisible}
                    onCancel={handleEditModalOpen}
                    footer={[
                        <Button key="back" onClick={handleEditModalOpen}>
                            Cancel
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={editModalLoading}
                            onClick={handleEditSubmit}
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Radio.Group onChange={handleEditRadio} value={status}>
                        <Radio style={radioStyle} value={"Approve"}>
                            Approve
                        </Radio>
                        <Radio style={radioStyle} value={"Reject"}>
                            Reject
                        </Radio>
                        <Radio style={radioStyle} value={"Pending"}>
                            Pending
                        </Radio>
                    </Radio.Group>
                </Modal>
                <Table
                    scroll={{
                        x: 500,
                    }}
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                />
            </div>
        );
    }
}

export default BonusTable;
