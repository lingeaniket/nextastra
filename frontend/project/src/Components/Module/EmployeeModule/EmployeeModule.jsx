import axios from "axios";
import React, { useEffect, useState } from "react";

const EmployeeModule = () => {
    const [employees, setEmployees] = useState([]);
    const [enterprises, setEnterprises] = useState([]);
    const [createModel, setCreateModel] = useState(false);

    const handleSetCreate = () => {
        setCreateModel((laststate) => !laststate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get("name");
        const department = formData.get("department");
        const salary = formData.get("salary");
        const role = formData.get("role");
        const enterprise = formData.get("enterprise");

        axios.post("http://localhost:3000/api/employees", { name, department, salary, role, enterprise }, { withCredentials: true }).then((response) => {
            const { id, enterpriseName } = response.data.employee;
            const employee = { id, name, department, salary, role, enterprise, enterpriseName, status: "active" };
            setEmployees((lastEmployees) => [...lastEmployees, employee]);
        });
    };

    function handleDelete() {
        const {
            employee: { id },
        } = this;
        if (confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:3000/api/employees/${id}`, { withCredentials: true }).then(() => {
                setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
            });
        } else {
            console.log("Cancelled!");
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/employees", { withCredentials: true }).then((response) => {
            const data = response.data;
            setEmployees(data.employees);
            setEnterprises(data.enterprises);
        });
    }, []);

    return (
        <div style={{ padding: "20px 15px" }}>
            <div>
                <button onClick={handleSetCreate} className='btn btn-primary'>
                    {!createModel ? "Create Employee" : "Cancel"}
                </button>
            </div>
            {createModel && (
                <div>
                    <div>Create Employee Form</div>
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
                                    <label className='form-label' htmlFor='department'>
                                        Department:
                                    </label>
                                    <input type='text' className='form-control' name='department' id='department' required />
                                </div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='role' className='form-label'>
                                    Role:
                                </label>
                                <input type='text' className='form-control' name='role' id='role' required />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='salary' className='form-label'>
                                    Salary:
                                </label>
                                <input type='text' className='form-control' name='salary' id='salary' required />
                            </div>
                            <div className='col-12'>
                                <label htmlFor='enterprise' className='form-label'>
                                    Select Enterprise:
                                </label>
                                <select name='enterprise' id='enterprise' className='form-control' defaultValue='1' required>
                                    {enterprises.map((enterprise) => (
                                        <option value={enterprise.id} key={enterprise.id}>
                                            {enterprise.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-12'>
                                <div style={{ textAlign: "center" }}>
                                    <button className='btn btn-primary'>Create Employee</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            <h2>Employees List</h2>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Role</th>
                        <th>Enterprise</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.role}</td>
                            <td>{employee.enterpriseName}</td>
                            <td>{employee.status}</td>
                            <td>
                                <button className='btn btn-primary'>Update</button>
                                <button className='btn btn-danger' onClick={handleDelete.bind({ employee })} style={{ marginLeft: "10px" }}>
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

export default EmployeeModule;
