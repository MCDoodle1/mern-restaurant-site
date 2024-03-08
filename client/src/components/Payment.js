import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/actions/orderActions";
import ProgressBar from "./ProgressBar";

const Payment = () => {
  const [paymentType, setPaymentType] = useState("stripe");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentMethod } = useSelector((state) => state.order);

   useEffect(() => {
    if (paymentMethod) {
      setPaymentType(paymentMethod);
    }
  }, [paymentMethod]);
  

  const handleChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentType));
    navigate("/placeorder");
  }; 

  return (
    <>
      <div className="p-3 mb-4 bg-body-secondary rounded-3 m-4">
        <div className="container-fluid py-1">
          <h5 className="fw-bold">
            <ProgressBar step1 step2 />
          </h5>
        </div>
      </div>
      <div className="container border py-4">
        <div className="row justify-content-center">
          <div className="">
            <h6 className="fw-bold mb-4">Payment</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <fieldset className="row mb-3">
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentType === "paypal"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label mb-1"
                    htmlFor="gridRadios1"
                  >
                    Paypal
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentType === "stripe"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    Stripe
                  </label>
                </div>
              </div>
            </fieldset>
            <button type="submit" className="btn btn-primary mt-2">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
