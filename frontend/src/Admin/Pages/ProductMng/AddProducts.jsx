import React, { useState } from "react";
import { api } from "../../../api/Axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import "./AddProducts.css";

const AddProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        name: "",
        description: "",
        image: "",
        sImage: "",
        tImage: "",
        price: "",
        catogory: "",
        stock: true
    });

    const addProduct = async () => {
        if (!product.title || !product.price ||
            !product.image || !product.catogory
        ) {
            return alert("Please fill all required fields");
        }

        await api.post("/products", product);
        navigate("/admin/products");
    };

    return (
        <Layout>
            <div className="add-product">
                <h2>Add Product</h2>


                <div className="form-group">
                    <label>Product Title *</label>
                    <input value={product.title} onChange={e => setProduct({ ...product, title: e.target.value })} />
                </div>


                <div className="form-group">
                    <label>Product Name</label>
                    <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
                </div>


                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="3" value={product.description}
                        onChange={e => setProduct({ ...product, description: e.target.value })} />
                </div>


                <div className="form-group">
                    <label>Price </label>
                    <input type="number" value={product.price}
                        onChange={e => setProduct({ ...product, price: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Category *</label>
                    <input placeholder="women / men" value={product.catogory}
                        onChange={e => setProduct({ ...product, catogory: e.target.value })} />
                </div>


                <div className="form-group">
                    <label>Main Image URL *</label>
                    <input value={product.image} onChange={e => setProduct({ ...product, image: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Second Image URL</label>
                    <input value={product.sImage} onChange={e => setProduct({ ...product, sImage: e.target.value })} />
                </div>

                <div className="form-group">
                    <label>Third Image URL</label>
                    <input value={product.tImage} onChange={e => setProduct({ ...product, tImage: e.target.value })} />
                </div>

                <div className="stock-toggle">
                    <label>
                        <input className="st" type="checkbox" checked={product.stock} 
                            onChange={e => setProduct({ ...product, stock: e.target.checked })} />
                        In Stock
                    </label>
                </div>

                <div className="form-actions">
                    <button className="save-btn" onClick={addProduct}>Save Product</button>

                    <button className="cancel-btn"
                        onClick={() => navigate("/admin/products")}>Cancel</button>
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
