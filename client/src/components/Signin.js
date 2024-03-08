import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { showErrorMessage } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { signin } from "../api/auth";
import { setAuthentication, isAuthenticated } from "../helpers/auth";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });
  const { email, password, errorMsg, loading } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          
          const redirect = location.search.split("=")[1];
          if (isAuthenticated() && isAuthenticated().role === 1) {
            navigate("/admin/dashboard");
          } else if (
            isAuthenticated() &&
            isAuthenticated().role === 0 &&
            !redirect
          ) {
            navigate("/user/dashboard");
          } else {
            navigate("/shipping");
          }
        })
        .catch((err) => {
          console.log("signin api function error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const showSigninForm = () => (
    <form className="signup-form d-grid" onSubmit={handleSubmit}>
      {/* email */}
      <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon2">
          <i className="fa fa-envelope py-1"></i>
        </span>
        <input
          type="text"
          name="email"
          value={email}
          className="form-control"
          placeholder="Email Address"
          aria-label="Email Address"
          aria-describedby="basic-addon2"
          onChange={handleChange}
        />
      </div>
      {/* password */}
      <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon3">
          <i className="fa fa-lock py-1"></i>
        </span>
        <input
          type="password"
          name="password"
          value={password}
          className="form-control"
          placeholder="Create password"
          aria-label="Create password"
          aria-describedby="basic-addon3"
          onChange={handleChange}
        />
      </div>
      {/* signin button */}
      <div className="form-group d-grid gap-2">
        <button className="btn btn-primary btn-block">Signin</button>
      </div>
      {/* already have account */}
      <div className="form-group">
        <p className="text-center text-white">
          No account yet?{" "}
          <Link to="/signup" href="">
            Signup
          </Link>
        </p>
      </div>
    </form>
  );

  return (
    <div className="signin-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {loading && <div className="text-center mb-4">{showLoading()}</div>}
          {errorMsg && showErrorMessage(errorMsg)}
          {showSigninForm()}
        </div>
      </div>
    </div>
  );
};

export default Signin;
