import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import { showLoading } from "../helpers/loading";
import { clearCartLocalStorage } from "../helpers/localStorage";
import { showSuccessMessage } from "../helpers/message";
import { clearCart } from "../redux/actions/cartActions";
import { getNewArrivals } from "../redux/actions/filterActions";
import { clearOrder } from "../redux/actions/orderActions";
import { getProductsByCount } from "../redux/actions/productActions";
import { set } from "mongoose";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (
      location.state &&
      location.state.result.paymentIntent.status === "succeeded"
    ) {
      //clear cart in Redux
      dispatch(clearCart());
      // clear order in Redux
      dispatch(clearOrder());
      // clear localStorage

      clearCartLocalStorage(() => {
        setSuccessMessage("Your payment was successful!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductsByCount());
  }, [dispatch]);

  const { newArrivals } = useSelector((state) => state.filters); // filters = same name as in store.js
  const { products } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.loading);
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <section className="homepage">
      <div className="banner-image"></div>
      {loading ? (
        <div className="text-center">{showLoading()}</div>
      ) : (
        <>
          <div className="container">
            <hr className="py-3" />
            {location.state &&
              location.state.result.paymentIntent.status === "succeeded" &&
              successMessage &&
              showSuccessMessage(successMessage)}
            <h3 className="py-3">New Arrivals</h3>
            <div className="row">
              {newArrivals?.map((newArrival) => (
                <Card
                  key={newArrival._id}
                  product={newArrival}
                  homePage={true}
                />
              ))}
            </div>
            <hr className="py-3" />
            <h3 className="py-3">Menu</h3>
            <div className="row">
              {products?.map((product) => (
                <Card key={product._id} product={product} homePage={true} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
