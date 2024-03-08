import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  return (
    <section className="product-page m-4">
      <button
        className="btn btn-light text-primary mb-4"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      {product && (
        <div className="row">
          <div className="col-md-6">
            <img
              className="card-img-top-product mb-4"
              src={`/uploads/${product.fileName}`}
              alt="product"
            />
          </div>
          <div className="col-md-6">
            <h3 className="mb-4">{product.productName}</h3>
            <p className="text-muted border-top py-2">
              Price:{" "}
              {product.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="text-muted border-top py-2">
              Status: {product.productQty > 0 ? "Available" : "Not Available"}
            </p>
            <p className="text-muted border-top py-2">
              Description: {product.productDesc}
            </p>
            <button
              className="btn btn-dark btn-lg col-12"
              disabled={product.productQty <= 0}
              onClick={handleAddToCart}
            >
              Add to Cart{" "}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
