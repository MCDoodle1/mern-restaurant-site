import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteFromCart } from "../redux/actions/cartActions";
import { ADD_TO_CART } from "../redux/constants/cartConstants";
import { isAuthenticated } from "../helpers/auth";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handleQtyChange = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    cart.forEach((cartItem) => {
      if (cartItem._id === product._id) {
        cartItem.count = e.target.value;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  const handleCheckOut = (e) => {
    if (isAuthenticated()) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=shipping");
    }
  };

  return (
    <section className="cart-page m-4">
      {cart.length > 0 ? (
        <>
          <div className="p-5 mb-4 bg-body-tertiary rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Cart</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product._id}>
                      <th scope="row">
                        <img
                          className="img-thumbnail"
                          style={{ maxWidth: "110px" }}
                          src={`/uploads/${product.fileName}`}
                          alt="product"
                        />
                      </th>
                      <td>
                        <Link to={`/product/${product._id}`}>
                          {product.productName}
                        </Link>
                      </td>
                      <td>
                        {product.productPrice.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td>
                        <input
                          type="number"
                          value={product.count}
                          min="1"
                          max={product.productQty}
                          onChange={(e) => handleQtyChange(e, product)}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => dispatch(deleteFromCart(product))}
                        >
                          <i className="fa-regular fa-trash-can me-1"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 border-start">
              <h2 className="ms-2">Cart Summary</h2>
              <p className="fw-light text-muted border-bottom">
                {cart.length === 1 ? "(1) item" : `(${cart.length}) items`}
              </p>
              <p className="fw-bold">
                Total: $
                {cart
                  .reduce(
                    (currentSum, currentCartItem) =>
                      currentSum +
                      currentCartItem.count * currentCartItem.productPrice,
                    0
                  )
                  .toFixed(2)}
              </p>
              <button
                className="btn btn-dark btn col-12"
                onClick={handleCheckOut}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">
              Your cart is empty
              <button
                className="btn btn-light text-primary ms-4"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
