import React, { useEffect, useState } from "react";
import {
    Tabs,
    List,
    Button,
    Col,
    Row,
    Modal,
    Form,
    Input,
    message,
    Space,
} from "antd";
import axios from "axios";
import AddTeamModal from "./addModal";
import { backendURL } from "../../../config";
import DeleteAction from "./deleteAction";

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const { TabPane } = Tabs;

const TeamRole = () => {
    const [teams, setTeams] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isTeamOrRole, setTeamRole] = useState(0);
    const [teamLoading, setTeamLoading] = useState(true);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${backendURL}/teamrole/`)
            .then(res => {
                setTeams(prev => (res.data.teams ? res.data.teams.data : prev));
                setRoles(prev => (res.data.roles ? res.data.roles.data : prev));
                setTeamLoading(false);
                setRoleLoading(false);
            })
            .catch(err => {
                console.error(err.message);
            });
    }, []);

    const handleAddSuccess = (value, label) => {
        if (label === "team") {
            setTeams(prev => [...prev, value]);
        } else {
            setRoles(prev => [...prev, value]);
        }

        setModalVisible(false);
        message.success({ content: `New ${label} Added` });
    };

    const handleAddCancel = () => {
        setModalVisible(false);
    };

    return (
        <div>
            <AddTeamModal
                isTeamModalVisible={isModalVisible}
                addTeamSuccess={handleAddSuccess}
                addTeamCancel={handleAddCancel}
                items={isTeamOrRole === 1 ? teams : roles}
                label={isTeamOrRole === 1 ? "team" : "role"}
            />
            <Tabs>
                <TabPane tab="Teams" key="team">
                    <Col>
                        <Row justify="end" style={{ marginBottom: "1rem" }}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setTeamRole(1);
                                    setModalVisible(true);
                                }}
                            >
                                Add Team
                            </Button>
                        </Row>
                        <List
                            size="large"
                            loading={teamLoading}
                            bordered
                            dataSource={teams}
                            renderItem={item => (
                                <List.Item
                                    style={{ backgroundColor: "#fff" }}
                                    actions={[
                                        <DeleteAction
                                            item={item}
                                            label="team"
                                            setTeams={setTeams}
                                            setRoles={setRoles}
                                            setTeamLoading={setTeamLoading}
                                            setRoleLoading={setRoleLoading}
                                            teams={teams}
                                            roles={roles}
                                        />,
                                    ]}
                                >
                                    <List.Item.Meta title={item} />
                                </List.Item>
                            )}
                        />
                    </Col>
                </TabPane>
                <TabPane key="role" tab="Roles">
                    <Col>
                        <Row justify="end" style={{ marginBottom: "1rem" }}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setTeamRole(2);
                                    setModalVisible(true);
                                }}
                            >
                                Add Role
                            </Button>
                        </Row>
                        <List
                            size="large"
                            loading={roleLoading}
                            bordered
                            dataSource={roles}
                            renderItem={item => (
                                <List.Item
                                    style={{ backgroundColor: "#fff" }}
                                    actions={[
                                        <DeleteAction
                                            item={item}
                                            label="role"
                                            setTeams={setTeams}
                                            setRoles={setRoles}
                                            setTeamLoading={setTeamLoading}
                                            setRoleLoading={setRoleLoading}
                                            teams={teams}
                                            roles={roles}
                                        />,
                                    ]}
                                >
                                    <List.Item.Meta title={item} />
                                </List.Item>
                            )}
                        />
                    </Col>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default TeamRole;
