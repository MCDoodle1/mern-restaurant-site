import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { getCategories } from "../redux/actions/categoryActions";
import { getProduct } from "../redux/actions/productActions";
import axios from "axios";

const AdminEditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { productId } = useParams();

  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQty, setProductQty] = useState("");

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(productId));
      dispatch(getCategories());
    } else {
      setProductImage(product.fileName);
      setProductName(product.productName);
      setProductDesc(product.productDesc);
      setProductPrice(product.productPrice);
      setProductCategory(product.productCategory);
      setProductQty(product.productQty);
    }
  }, [dispatch, productId, product]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productQty", productQty);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .put(`/api/product/${productId}`, formData, config)
      .then((res) => {
        navigate("/admin/dashboard")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
  };

  return (
    <>
      <AdminHeader />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <Link to="/admin/dashboard">
              <span className="fas fa-arrow-left"> Go Back</span>
            </Link>
            <div>
              <br />
              <div className="modal-content">
                <form onSubmit={handleProductSubmit}>
                  <div className="modal-header bg-warning text-white">
                    <h5 className="modal-title ms-2">Update Food</h5>
                  </div>
                  <div className="modal-body my-2">
                    <label className="btn btn-dark me-3">
                      Choose image
                      <input
                        type="file"
                        name="productImage"
                        accept="images/*"
                        hidden
                        onChange={handleImageUpload}
                      />
                    </label>
                    {productImage && productImage.name ? (
                      <span className="badge badge-secondary">
                        {productImage.name}
                      </span>
                    ) : productImage ? (
                      <img
                        className="img-thumbnail"
                        style={{
                          width: "120px",
                          height: "80px",
                        }}
                        src={`/uploads/${productImage}`}
                        alt="product"
                      />
                    ) : null}

                    <div className="col my-3">
                      <label className="text-secondary">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    <div className="col mb-3">
                      <label className="text-secondary">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="productDesc"
                        value={productDesc}
                        onChange={(e) => setProductDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="col mb-3">
                      <label className="text-secondary">Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                      />
                    </div>

                    <div className="row">
                      <div className="col mb-3">
                        <label className="text-secondary me-2">Category</label>
                        <select
                          className="form-select"
                          name="productCategory"
                          value={productCategory}
                          onChange={(e) => setProductCategory(e.target.value)}
                        >
                          <option value="">Choose one...</option>
                          {categories &&
                            categories.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.category}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col mb-3">
                        <label className="text-secondary">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="1000"
                          name="productQty"
                          value={productQty}
                          onChange={(e) => setProductQty(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-warning text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEditProduct;
