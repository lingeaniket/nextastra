import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserModule = () => {
    const [users, setUsers] = useState([]);
    const [enterprises, setEnterprises] = useState([]);
    const [roles, setRoles] = useState([]);
    const [createModel, setCreateModel] = useState(false);

    const navigate = useNavigate();

    const handleSetCreate = () => {
        setCreateModel((laststate) => !laststate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get("name");
        const roleId = formData.get("role");
        const email = formData.get("email");
        const password = formData.get("password");
        const enterprise = formData.get("enterprise");

        axios.post("http://localhost:3000/api/users", { name, roleId, password, email, enterprise }, { withCredentials: true }).then((response) => {
            const { id, email, roleId, enterpriseName, roleName } = response.data.user;
            const user = { id, email, roleId, name, enterpriseName, roleName };
            setUsers((lastUsers) => [...lastUsers, user]);
        });
    };

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
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            });
        } else {
            console.log("Cancelled!");
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/users", { withCredentials: true }).then((response) => {
            const data = response.data;
            setUsers(data.users);
            setEnterprises(data.enterprises);
            setRoles(data.roles);
        });
    }, []);

    return (
        <div style={{ padding: "20px 15px" }}>
            <div>
                <button onClick={handleSetCreate} className='btn btn-primary'>
                    {!createModel ? "Create User" : "Cancel"}
                </button>
            </div>
            {createModel && (
                <div>
                    <div>Create User Form</div>
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
                                <div>
                                    <label className='form-label' htmlFor='email'>
                                        Email Address:
                                    </label>
                                    <input type='email' className='form-control' name='email' id='email' required />
                                </div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='role' className='form-label'>
                                    Select Role:
                                </label>
                                <select name='role' id='role' className='form-control' defaultValue='1' required>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='enterprise' className='form-label'>
                                    Select Enterprise:
                                </label>
                                <select name='enterprise' id='enterprise' className='form-control' defaultValue='1' required>
                                    {enterprises.map((enterprise) => (
                                        <option key={enterprise.id} value={enterprise.id}>
                                            {enterprise.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='password' className='form-label'>
                                    Password:
                                </label>
                                <div className='row'>
                                    <div className='col-8'>
                                        <input type='password' className='form-control' name='password' id='password' required />
                                    </div>
                                    <div className='col-4'>
                                        <button className='btn btn-success'>Generate Password</button>
                                    </div>
                                </div>
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
            <h2>Users List</h2>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Enterprise</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.roleName}</td>
                            <td>{user.enterpriseName}</td>
                            <td>
                                <button className='btn btn-primary' onClick={handleUserView.bind({ user })}>
                                    View
                                </button>
                                <button className='btn btn-danger' onClick={handleDelete.bind({ user })} style={{ marginLeft: "10px" }}>
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

export default UserModule;
