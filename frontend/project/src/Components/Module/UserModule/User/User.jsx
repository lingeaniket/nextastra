import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const User = () => {
    const { id } = useParams();

    const [user, setUser] = useState({});
    const [formDisable, setFormDisable] = useState(true);
    const [loading, setLoading] = useState(true);

    const [selectData, setSelectData] = useState({ roles: [], enterprises: [] });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!formDisable) {
            // make api call for here
            console.log("called");
        }
    };

    const handleFormUpdate = () => {
        setFormDisable((laststate) => !laststate);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/users/${id}`, { withCredentials: true })
            .then((response) => {
                setUser(response.data.user);
                const { roles: rolesData, enterprises: enterprisesData } = response.data;
                setSelectData(() => {
                    return { roles: rolesData, enterprises: enterprisesData };
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);
    return (
        <section className='container'>
            <div style={{ padding: "20px 15px" }}>
                {!loading && (
                    <>
                        {user.name ? (
                            <>
                                <div className='go-back'>
                                    <Link to='/users'>
                                        <i class='bi bi-arrow-left-circle-fill'></i>
                                        <span style={{ marginLeft: "10px" }}>Go Back</span>
                                    </Link>
                                </div>
                                <h2>User</h2>
                                <form onSubmit={handleFormSubmit}>
                                    <div className='row gap-2'>
                                        <div className='col-12'>
                                            <label htmlFor='name'>Name:</label>
                                            <input type='text' className='form-control' name='name' id='name' defaultValue={user.name} disabled={formDisable} />
                                        </div>
                                        <div className='col-12'>
                                            <lable className='form-label' htmlFor='email'>
                                                Email
                                            </lable>
                                            <input type='text' className='form-control' name='email' id='email' disabled defaultValue={user.email} />
                                        </div>
                                        <div className='col-12'>
                                            <label htmlFor='role' className='form-label'>
                                                Role
                                            </label>
                                            <select name='role' id='role' className='form-control' defaultValue={user.roleId} disabled={formDisable}>
                                                {selectData.roles?.map((role) => (
                                                    <option value={role.id} key={role.id}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='col-12'>
                                            <label htmlFor='enterprise' className='form-label'>
                                                Enterprise:
                                            </label>
                                            <select name='enterprise' id='enterprise' className='form-control' defaultValue={user.enterpriseId} disabled={formDisable}>
                                                {selectData.enterprises?.map((enterprise) => (
                                                    <option value={enterprise.id} key={enterprise.id}>
                                                        {enterprise.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='col-12'>
                                            {!formDisable && (
                                                <>
                                                    <button className='btn btn-success' type='submit'>
                                                        Save
                                                    </button>
                                                    <button type='button' className='btn btn-primary' style={{ marginLeft: "10px" }} onClick={handleFormUpdate}>
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </form>
                                <br />
                                <div>
                                    {formDisable && (
                                        <button type='button' className='btn btn-primary' onClick={handleFormUpdate}>
                                            Update
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>No user Found</>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default User;
