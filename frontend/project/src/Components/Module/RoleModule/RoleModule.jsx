import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleModule = () => {
    const [roles, setRoles] = useState([]);
    const [createModel, setCreateModel] = useState(false);

    const [modules] = useState(["role", "user", "enterprise", "dashboard", "employee", "product"]);

    const [moduleData, setModuleData] = useState({
        role: { status: false },
        user: { status: false },
        enterprise: { status: false },
        dashboard: { status: false },
        employee: { status: false },
        product: { status: false },
    });

    const navigate = useNavigate();

    const handleSetCreate = () => {
        setCreateModel((laststate) => !laststate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get("name");

        axios.post("http://localhost:3000/api/roles", { name, moduledata: moduleData }, { withCredentials: true }).then((response) => {
            const { role } = response.data;
            setRoles((lastRoles) => [...lastRoles, role]);
        });
    };

    function handleMainCheckbox(event) {
        const { module } = this;

        const modData = { ...moduleData[module], status: event.target.checked };

        setModuleData((lastdata) => {
            return { ...lastdata, [module]: modData };
        });
    }

    function handleCheckbox(event) {
        const { name, checked } = event.target;
        const [module, action] = name.split("-");

        const modData = { ...moduleData[module], [action]: checked };

        setModuleData((lastdata) => {
            return { ...lastdata, [module]: modData };
        });
    }

    function handleUserView() {
        const {
            user: { id },
        } = this;
        navigate(`/users/${id}`);
    }

    function handleDelete() {
        const {
            user: { id },
        } = this;
        if (confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:3000/api/users/${id}`, { withCredentials: true }).then(() => {
                setRoles((prevUsers) => prevUsers.filter((user) => user.id !== id));
            });
        } else {
            console.log("Cancelled!");
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/roles", { withCredentials: true }).then((response) => {
            const data = response.data;
            setRoles(data.roles);
        });
    }, []);

    return (
        <div style={{ padding: "20px 15px" }}>
            <div>
                <button onClick={handleSetCreate} className='btn btn-primary'>
                    {!createModel ? "Create Role" : "Cancel"}
                </button>
            </div>
            {createModel && (
                <div>
                    <div>Create Role Form</div>
                    <form onSubmit={handleSubmit}>
                        <div className='row gap-2'>
                            <div className='col-12'>
                                <div>
                                    <label className='form-label' htmlFor='name'>
                                        Name:
                                    </label>
                                    <input type='text' className='form-control' name='name' id='name' required />
                                </div>
                            </div>
                            <div className='col-12'>
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Feature</th>
                                            <th>Create</th>
                                            <th>Read</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modules.map((module) => (
                                            <tr key={module}>
                                                <td>
                                                    <input type='checkbox' checked={moduleData[module].status} onChange={handleMainCheckbox.bind({ module })} />
                                                </td>
                                                <td style={{ textTransform: "capitalize" }}>{module}</td>
                                                {["create", "read", "update", "delete"].map((action) => (
                                                    <td key={action}>
                                                        <input type='checkbox' name={`${module}-${action}`} disabled={!moduleData[module].status} checked={moduleData[module][action] === true} onChange={handleCheckbox} />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className='col-12'>
                                <div style={{ textAlign: "center" }}>
                                    <button className='btn btn-primary'>Create</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <h2>Roles List</h2>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Modules</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td>{role.id}</td>
                            <td>{role.name}</td>
                            <td style={{ textTransform: "capitalize" }}>{role.modules}</td>
                            <td>
                                <button className='btn btn-primary' onClick={handleUserView.bind({ role })}>
                                    View
                                </button>
                                <button className='btn btn-danger' onClick={handleDelete.bind({ role })} style={{ marginLeft: "10px" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// export default UserModule;
export default RoleModule;
