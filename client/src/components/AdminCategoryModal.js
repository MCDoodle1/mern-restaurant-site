import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "validator/lib/isEmpty";
import { showLoading } from "../helpers/loading";
import { showErrorMessage, showSuccessMessage } from "../helpers/message";
import { createCategory } from "../redux/actions/categoryActions";
import { clearMessages } from "../redux/actions/messageActions";

const AdminCategoryModal = () => {
  /*********************************
   * REDUX GLOBAL STATE PROPERTIES *
   **********************************/
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector(
    (state) => state.messages
  );
  const { loading } = useSelector((state) => state.loading);

  /*********************************
   * COMPONENT STATE PROPERTIES *
   **********************************/
  const [category, setCategory] = useState("");
  const [clientSideErrorMessage, setClientSideErrorMessage] = useState("");

  /*********************************
   * EVENT HANDLERS *
   **********************************/
  const handleMessageRemoval = () => {
    dispatch(clearMessages());
  };

  function handleCategorySubmit(e) {
    e.preventDefault();

    if (isEmpty(category)) {
      setClientSideErrorMessage("Please enter a category");
    } else {
      const data = { category };
      dispatch(createCategory(data));
      setCategory('');
    }
  }

  const handleCategoryChange = (e) => {
    dispatch(clearMessages());
    setCategory(e.target.value);
  };

  /*********************************
   * RENDERER *
   **********************************/
  return (
    <div
      id="addCategoryModal"
      className="modal fade"
      tabIndex="-1"
      aria-labelledby=""
      aria-hidden="true"
      onClick={handleMessageRemoval}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Add Category</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {clientSideErrorMessage && showErrorMessage(clientSideErrorMessage)}
              {successMessage && showSuccessMessage(successMessage)}
              {errorMessage && showErrorMessage(errorMessage)}
              {loading ? (
                <div className="text-center">{showLoading()}</div>
              ) : (
                <>
                  <label className="text-secondary my-2">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={category}
                    name="category"
                    onChange={handleCategoryChange}
                  />
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
              <button type="submit" className="btn btn-info text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryModal;

/* ////////////////////////////////////////////////////////// 
BEFORE INTRODUCTION OF REDUX, THIS COMPONENT LOOKED AS FOLLOWS:

import { useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { createCategory } from "../api/category";
import { showLoading } from "../helpers/loading";
import { showErrorMessage, showSuccessMessage } from "../helpers/message";
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../redux/actions/messageActions";
import { createCategories } from "../redux/actions/categoryActions";

const AdminCategoryModal = () => {

  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleMessageRemoval = () => {
  setErrorMessage("");
  setSuccessMessage("");
};

function handleCategorySubmit(e) {
      e.preventDefault();

      if (isEmpty(category)) {
          setErrorMessage("Please enter a category");
      } else {
          const data = { category };

          setLoading(true);
          createCategory(data) // starts HTTP-request
              .then((response) => {
                  setLoading(false);
                  setSuccessMessage(response.data.successMessage);
                  setCategory("");
              })
              .catch((err) => {
                  setLoading(false);
                  setErrorMessage(err.response.data.errorMessage);
              });
      }
  }

const handleCategoryChange = (e) => {
  setErrorMessage("");
  setSuccessMessage("");
  setCategory(e.target.value);
};

return (
  <div
    id="addCategoryModal"
    className="modal fade"
    tabIndex="-1"
    aria-labelledby=""
    aria-hidden="true"
    onClick={handleMessageRemoval}
  >
    <div className="modal-dialog modal-dialog-centered modal-xl">
      <div className="modal-content">
        <form onSubmit={handleCategorySubmit}>
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Add Category</h5>
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
                <label className="text-secondary my-2">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={category}
                  name="category"
                  onChange={handleCategoryChange}
                />
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
            <button type="submit" className="btn btn-info text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default AdminCategoryModal;

////////////////////////////////////////////////////////// */
