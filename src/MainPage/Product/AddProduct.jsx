import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Upload } from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import axios from "axios";
import { notify } from '../../common/ToastComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = "http://localhost:5071";

const AddProduct = () => {
    let product = {};
    const location = useLocation();
    const state = location.state;
    const [saveType, setSaveType] = useState('post'); 
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productCode, setProductCode] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [buyingPrice, setBuyingPrice] = useState('');
    const [categories, setCategories] = useState([]);

    //Load product categories
    useEffect(() => {
        const fetchData = async () => {
            axios.get(`${baseUrl}/productcategory`)
                .then(res => {
                    const resData = res.data.map(
                        category => {
                            return { id: category.id, text: category.name }
                        }
                    );
                    setCategories([...resData]);
                })
        }

        fetchData().catch(console.log(console.error));
    }, []);

    useEffect(() => {
        console.log("Here")
        categories.length && initializeForm();
    }, [categories])

    const initializeForm = () => {
        if(state){
            const { product } = state;
            setProductName(product.name);
            setProductCategory(product.productCategory.id);
            setProductCode(product.barCode);
            setSellingPrice(product.sellingPrice);
            setBuyingPrice(product.buyingPrice);
            setSaveType('update');
        }
    }

    const SaveProduct = (product) => {
        if(saveType == 'post'){
            axios.post(`${baseUrl}/products`, product).then(handleResponse).catch(handleError);
        } else {
            console.log(product.id);
            axios.put(`${baseUrl}/products/${product.id}`, product).then(handleResponse).catch(handleError);
        }
    }

    const handleResponse = res => {
        console.log("POST RES::")
        console.log(res.data);
        notify(`${productName} ${saveType == 'post' ? "Added" : "Updated"} Successfully!`, "success", toast);
        clearInputs();
    }

    const handleError = res => {
        console.log("POST RES::")
        console.log(res.data);
        notify(`Error ${saveType == 'post' ? "Adding" : "Updating"} ${productName}`, "error", toast);
        clearInputs();
    }

    const handleSave = () => {
        //TODO: validate fields

        //Create Product
        product = {
            Name: productName,
            BarCode: productCode,
            SellingPrice: sellingPrice,
            CategoryId: productCategory,
            BuyingPrice: buyingPrice
        }

        if(saveType == 'update'){
            product.id = state.product.id;
        }

        //Post Products
        console.log(product);
        SaveProduct(product);
    }

    const clearInputs = () => {
        setProductCategory('');
        setProductCode('');
        setProductName('');
        setSellingPrice('');
        setBuyingPrice('');
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Product Add</h4>
                            <h6>Create new product</h6>
                        </div>
                    </div>
                    {/* /add */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <Select2
                                            className="select"
                                            value={productCategory}
                                            onChange={(e) => setProductCategory(e.target.value)}
                                            data={categories}
                                            options={{
                                                placeholder: 'Choose Category',
                                            }}
                                        />

                                    </div>
                                </div>
                                <div className="col-lg-2 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Product Code</label>
                                        <input
                                            type="text"
                                            value={productCode}
                                            onChange={(e) => setProductCode(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Selling Price</label>
                                        <input
                                            type="text"
                                            pattern="[0-9]*"
                                            value={sellingPrice}
                                            onChange={(e) => setSellingPrice(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-lg-2 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Buying Price</label>
                                        <input
                                            type="text"
                                            pattern="[0-9]*"
                                            value={buyingPrice}
                                            onChange={(e) => setBuyingPrice(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label> Product Image</label>
                                        <div className="image-upload">
                                            <input type="file" />
                                            <div className="image-uploads">
                                                <img src={Upload} alt="img" />
                                                <h4>Drag and drop a file to upload</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button className="btn btn-submit me-2" onClick={handleSave}>
                                        Submit
                                    </button>
                                    <button className="btn btn-cancel">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /add */}
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
export default AddProduct;