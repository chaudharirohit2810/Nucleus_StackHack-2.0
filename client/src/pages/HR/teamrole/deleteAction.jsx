import React from "react";
import { message } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { backendURL } from "../../../config";
import axios from "axios";

const DeleteAction = ({
    item,
    label,
    setTeams,
    teams,
    setRoles,
    roles,
    setRoleLoading,
    setTeamLoading,
}) => {
    return (
        <DeleteFilled
            style={{ cursor: "pointer" }}
            onClick={() => {
                if (label == "role") {
                    setRoleLoading(true);
                } else {
                    setTeamLoading(true);
                }
                axios
                    .delete(`${backendURL}/teamrole/${label}/${item}`)
                    .then(res => {
                        if (label === "role") {
                            var newRoles = [...roles];
                            newRoles.splice(
                                newRoles.findIndex(it => it === item),
                                1
                            );
                            setRoles(newRoles);
                            setRoleLoading(false);
                            message.success("Role Deleted Successfully");
                        } else {
                            var newTeams = [...teams];
                            newTeams.splice(
                                newTeams.findIndex(it => it === item),
                                1
                            );
                            setTeams(newTeams);
                            setTeamLoading(false);
                            message.success("Team Deleted Successfully");
                        }
                    })
                    .catch(err => {
                        if (label == "role") {
                            setRoleLoading(true);
                        } else {
                            setTeamLoading(true);
                        }
                        console.log(err.message);
                    });
            }}
        />
    );
};

export default DeleteAction;
