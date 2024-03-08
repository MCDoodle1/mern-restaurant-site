import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
import { } from "../redux/actions/categoryActions";
import AdminDashboard from "./AdminDashboard";
import AdminEditProduct from "./AdminEditProduct";
import Header from "./Header";
import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import Shipping from "./Shipping";
import Payment from "./Payment";
import PlaceOrder from "./PlaceOrder";
import NotFound from "./NotFound";
import Shop from "./Shop";
import Signin from "./Signin";
import Signup from "./Signup";
import UserDashboard from "./UserDashboard";

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/placeorder" element={<PlaceOrder />} />
          <Route exact path="/product/:productId" element={<Product />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route
            path="/user/dashboard"
            element={<PrivateRoute element={<UserDashboard />} />}
          />
          <Route
            path="/admin/dashboard"
            element={<PrivateRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/admin/edit/product/:productId"
            element={<PrivateRoute element={<AdminEditProduct />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
