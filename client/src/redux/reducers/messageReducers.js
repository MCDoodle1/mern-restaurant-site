import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
  CLEAR_MESSAGES,
} from "../constants/messageConstants";

const INITIAL_STATE = {
  errorMessage: "",
  successMessage: "",
};

const messageReducer = (state = { INITIAL_STATE }, action) => {
  switch (action.type) {
    case SHOW_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SHOW_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        errorMessage: "",
        successMessage: "",
      };
    default:
      return state;
  }
};

export default messageReducer;
