import { ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART } from "../constants/cartConstants";

export const addToCart = (product) => async (dispatch) => {
  // If cart exists in localStorage, add the cart. If not, add an empty array
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  // Check if the cart already contains the item to add
  const duplicates = cart.filter((cartItem) => cartItem._id === product._id);

  // If no duplicates, add the item to the cart
  if (duplicates.length === 0) {
    const productToAdd = { ...product, count: 1 };
    cart.push(productToAdd);

    // Add the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Add the cart to Redux
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  }
};
export const deleteFromCart = (product) => async (dispatch) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const updatedCart = cart.filter(cartItem => cartItem._id !== product._id);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

    dispatch({
      type: DELETE_FROM_CART,
      payload: updatedCart,
    });
};
export const clearCart = () => async (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
};
