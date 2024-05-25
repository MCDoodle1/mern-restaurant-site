import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMessage, showSuccessMessage } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { signup } from "../api/auth";
import { isAuthenticated } from "../helpers/auth";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // client-side validation
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };
      setFormData({
        ...formData,
        loading: true,
      });
      signup(data)
        .then((response) => {
          console.log("Axios signup success: ", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const showSignupForm = () => (
    <form className="signup-form d-grid" onSubmit={handleSubmit}>
      {/* username */}
      <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa fa-user py-1"></i>
        </span>
        <input
          type="text"
          name="username"
          value={username}
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={handleChange}
        />
      </div>
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
      {/* password 2*/}
      <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon3">
          <i className="fa fa-lock py-1"></i>
        </span>
        <input
          type="password"
          name="password2"
          value={password2}
          className="form-control"
          placeholder="Confirm password"
          aria-label="Confirm password"
          aria-describedby="basic-addon3"
          onChange={handleChange}
        />
      </div>
      {/* signup button */}
      <div className="form-group d-grid gap-2">
        <button className="btn btn-primary btn-block">Signup</button>
      </div>
      {/* already have account */}
      <div className="form-group">
        <p className="text-center text-white">
          Already have an account?{" "}
          <Link to="/signin" href="">
            Signin
          </Link>
        </p>
      </div>
    </form>
  );

  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {loading && <div className="text-center mb-4">{showLoading()}</div>}
          {errorMsg && showErrorMessage(errorMsg)}
          {successMsg && showSuccessMessage(successMsg)}
          {showSignupForm()}
          {/* <p style={{ 'color': 'white'}}>{JSON.stringify(formData)}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
