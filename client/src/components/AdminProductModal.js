import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "validator/lib/isEmpty";
import { showLoading } from "../helpers/loading";
import { showErrorMessage, showSuccessMessage } from "../helpers/message";
import { clearMessages } from "../redux/actions/messageActions";
import { createProduct } from "../redux/actions/productActions";

const AdminProductModal = () => {
  /*********************************
   * REDUX GLOBAL STATE PROPERTIES *
   **********************************/
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector(
    (state) => state.messages
  );
  const { loading } = useSelector((state) => state.loading);
  const { categories } = useSelector((state) => state.categories);

  /*********************************
   * COMPONENT STATE PROPERTIES *
   **********************************/
  const [clientSideErrorMessage, setClientSideErrorMessage] = useState("");

  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQty,
  } = productData;

  const handleMessageRemoval = () => {
    dispatch(clearMessages());
    setClientSideErrorMessage('');
  };

  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductImage = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (productImage === null) {
      setClientSideErrorMessage("Please load an image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice)
    ) {
      setClientSideErrorMessage("All fields are required");
    } else if (isEmpty(productCategory)) {
      setClientSideErrorMessage("Please select a category");
    } else if (isEmpty(productQty)) {
      setClientSideErrorMessage("Please select a quantity");
    } else {
      let formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      dispatch(createProduct(formData));
      setProductData({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productQty: "",
      });
    }
  };

  return (
    <div
      id="addFoodModal"
      className="modal fade"
      tabIndex="-1"
      aria-labelledby=""
      aria-hidden="true"
      onClick={handleMessageRemoval}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <form encType="multipart/form-data" onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add Food</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {clientSideErrorMessage &&
                showErrorMessage(clientSideErrorMessage)}
              {errorMessage && showErrorMessage(errorMessage)}
              {successMessage && showSuccessMessage(successMessage)}

              {loading ? (
                <div className="text-center">{showLoading()}</div>
              ) : (
                <>
                  <div className="container">
                    <div className="input-group mb-3">
                      <input
                        type="file"
                        className="form-control"
                        name="productImage"
                        onChange={handleProductImage}
                      />
                      <label className="input-group-text" htmlFor="choosefile">
                        Browse
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={productName}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="col-12 mb-2">
                      <label className="text-secondary">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="productDesc"
                        value={productDesc}
                        onChange={handleProductChange}
                      ></textarea>
                    </div>
                    <div className="col-12 mb-2">
                      <label className="text-secondary">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productPrice"
                        value={productPrice}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="row mb-2">
                      <div className="col-6">
                        <label className="text-secondary">Category</label>
                        <select
                          id=""
                          className="form-select"
                          name="productCategory"
                          onChange={handleProductChange}
                        >
                          <option value="">Choose one</option>
                          {categories &&
                            categories.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.category}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="text-secondary">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="1000"
                          name="productQty"
                          value={productQty}
                          onChange={handleProductChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-warning text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;

/************************************
CODE BEFORE INTRODUCTION OF REDUX:

import { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { getCategories } from "../api/category";
import { createProduct } from "../api/product";
import { showLoading } from "../helpers/loading";
import { showErrorMessage, showSuccessMessage } from "../helpers/message";

const AdminProductModal = () => {
  const [categories, setCategories] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQty,
  } = productData;

  useEffect(() => {
    loadCategories();
  }, [loading]);

  const loadCategories = async () => {
    await getCategories()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMessageRemoval = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductImage = (e) => {
    console.log(e.target.files[0]);
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (productImage === null) {
      setErrorMessage("Please load an image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice)
    ) {
      setErrorMessage("All fields are required");
    } else if (isEmpty(productCategory)) {
      setErrorMessage("Please select a category");
    } else if (isEmpty(productQty)) {
      setErrorMessage("Please select a quantity");
    } else {
      let formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      setLoading(true);
      createProduct(formData)
        .then((response) => {
          setLoading(false);
          setProductData({
            productImage: null,
            productName: "",
            productDesc: "",
            productPrice: "",
            productCategory: "",
            productQty: "",
          });
          setSuccessMessage(response.data.successMessage);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setErrorMessage(err.response.data.errorMessage);
        });
    }
  };

  return (
    <div
      id="addFoodModal"
      className="modal fade"
      tabIndex="-1"
      aria-labelledby=""
      aria-hidden="true"
      onClick={handleMessageRemoval}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <form encType="multipart/form-data" onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title">Add Food</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {errorMessage && showErrorMessage(errorMessage)}
              {successMessage && showSuccessMessage(successMessage)}

              {loading ? (
                <div className="text-center">{showLoading()}</div>
              ) : (
                <>
                  <div className="container">
                    <div className="input-group mb-3">
                      <input
                        type="file"
                        className="form-control"
                        name="productImage"
                        onChange={handleProductImage}
                      />
                      <label className="input-group-text" htmlFor="choosefile">
                        Browse
                      </label>
                    </div>
                    <div className="col-12 mb-2">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={productName}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="col-12 mb-2">
                      <label className="text-secondary">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="productDesc"
                        value={productDesc}
                        onChange={handleProductChange}
                      ></textarea>
                    </div>
                    <div className="col-12 mb-2">
                      <label className="text-secondary">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productPrice"
                        value={productPrice}
                        onChange={handleProductChange}
                      />
                    </div>
                    <div className="row mb-2">
                      <div className="col-6">
                        <label className="text-secondary">Category</label>
                        <select
                          id=""
                          className="form-select"
                          name="productCategory"
                          onChange={handleProductChange}
                        >
                          <option value="">Choose one</option>
                          {categories &&
                            categories.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.category}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="text-secondary">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="1000"
                          name="productQty"
                          value={productQty}
                          onChange={handleProductChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-warning text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;

/*********************************** */
