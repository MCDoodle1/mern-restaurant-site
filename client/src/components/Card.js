import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const Card = ({ product, adminPage = false, homePage = false }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }
  
  return (
    <div className="col-md-4 g-3">
      <div className="card h-100">
        <a href="#!">
          <img
            className="card-img-top"
            src={`/uploads/${product.fileName}`}
            alt="product"
          />
        </a>
        <div className="card-body text-center">
          <h5 className="card-title">{product.productName}</h5>
          <hr />
          <h6 className="card-subtitle mb-3">
            <span className="text-secondary mr-2">
              {product.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </h6>
          <p>{product.productQty > 0 ? "Available" : "Not Available"}</p>
          <p className="card-text">
            {product.productDesc.length > 60
              ? product.productDesc.substring(0, 60) + "..."
              : product.productDesc.substring(0, 60)}
          </p>
          {adminPage && (
            <>
              <Link
                to={`/admin/edit/product/${product._id}`}
                type="button"
                className="btn btn-secondary btn-sm me-1"
              >
                <i className="far fa-edit me-1"></i>
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                <i className="fa-regular fa-trash-can me-1"></i>
                Delete
              </button>
            </>
          )}
          {homePage && (
            <div className="row row-cols-auto gap-2 justify-content-center">
              <Link
                to={`/product/${product._id}`}
                type="button"
                className="btn btn-primary btn-sm"
              >
                View Product
              </Link>
              <button
                type="button"
                className="btn btn-warning btn-sm"
                disabled={product.productQty <= 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
