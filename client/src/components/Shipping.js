import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usaStates from "../data/usaStates";
import { saveShippingAddress } from "../redux/actions/orderActions";
import ProgressBar from "./ProgressBar";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector(state => state.order);

  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    shippingAddress.address
      ? setAddress(shippingAddress.address)
      : setAddress("");
    shippingAddress.address2
      ? setAddress2(shippingAddress.address2)
      : setAddress2("");
    shippingAddress.city ? setCity(shippingAddress.city) : setCity("");
    shippingAddress.state ? setState(shippingAddress.state) : setState("");
    shippingAddress.zip ? setZip(shippingAddress.zip) : setZip("");
  }, [
    shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingData = {
      address,
      address2,
      city,
      state,
      zip,
    };
    dispatch(saveShippingAddress(shippingData));
    navigate("/payment");
  };

  return (
    <>
      <div className="p-3 mb-4 bg-body-secondary rounded-3 m-4">
        <div className="container-fluid py-1">
          <h5 className="fw-bold">
            <ProgressBar step1 />
          </h5>
        </div>
      </div>
      <div className="container border py-4">
        <div className="row justify-content-center">
          <div className="">
            <h6 className="fw-bold">Shipping Details</h6>
          </div>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">
                State
              </label>
              <select
                id="inputState"
                className="form-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option defaultValue>Choose...</option>
                {usaStates.map((s) => (
                  <option key={s.abbreviation} value={s.abbreviation}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="inputZip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
