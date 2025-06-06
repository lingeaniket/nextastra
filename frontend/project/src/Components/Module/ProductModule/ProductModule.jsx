import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductModule = () => {
    const [products, setProducts] = useState([]);
    const [createModel, setCreateModel] = useState(false);

    const handleSetCreate = () => {
        setCreateModel((laststate) => !laststate);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get("name");
        const sku = formData.get("sku");
        const price = formData.get("price");
        const category = formData.get("category");

        axios.post("http://localhost:3000/api/products", { name, sku, price, category }, { withCredentials: true }).then((response) => {
            const { id } = response.data.product;
            const product = { id, name, sku, category, price };
            setProducts((lastProducts) => [...lastProducts, product]);
        });
    };

    function handleDelete() {
        const {
            product: { id },
        } = this;
        if (confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:3000/api/products/${id}`, { withCredentials: true }).then(() => {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            });
        } else {
            console.log("Cancelled!");
        }
    }

    useEffect(() => {
        axios.get("http://localhost:3000/api/products", { withCredentials: true }).then((response) => {
            const data = response.data;
            setProducts(data);
        });
    }, []);

    return (
        <div style={{ padding: "20px 15px" }}>
            <div>
                <button onClick={handleSetCreate} className='btn btn-primary'>
                    {!createModel ? "Create Product" : "Cancel"}
                </button>
            </div>
            {createModel && (
                <div>
                    <div>Create Product Form</div>
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
                                    <label className='form-label' htmlFor='sku'>
                                        SKU:
                                    </label>
                                    <input type='text' className='form-control' name='sku' id='sku' required />
                                </div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='category' className='form-label'>
                                    Select Category:
                                </label>
                                <select name='category' id='category' className='form-control' defaultValue='1' required>
                                    <option value='1'>Main</option>
                                </select>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='price' className='form-label'>
                                    Price:
                                </label>

                                <input type='text' className='form-control' name='price' id='price' required />
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
            <h2>Products List</h2>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.status}</td>
                            <td>
                                <button className='btn btn-primary'>Update</button>
                                <button className='btn btn-danger' onClick={handleDelete.bind({ product })} style={{ marginLeft: "10px" }}>
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

export default ProductModule;
