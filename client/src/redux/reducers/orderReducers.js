import { SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD, CLEAR_ORDER } from "../constants/orderConstants";

let INITIAL_STATE = {
  shippingAddress: {},
  paymentMethod: "",
};

if (localStorage.getItem("shippingAddress")) {
  INITIAL_STATE.shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );
} else {
  INITIAL_STATE.shippingAddress = {};
}
/* if (localStorage.getItem("paymentMethod")) {
  INITIAL_STATE.paymentMethod = JSON.parse(
    localStorage.getItem("paymentMethod")
  );
} else {
  INITIAL_STATE.paymentMethod = {};
} */

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CLEAR_ORDER:
      return {
        shippingAddress: {},
        paymentMethod: "",
      };
    default:
      return state;
  }
};

export default orderReducer;
