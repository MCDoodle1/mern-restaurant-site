import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const handleLogout = (e) => {
    logout(() => {
      navigate("/signin");
    });
  };

  const showNavigation = () => (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isAuthenticated() && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" className="nav-link">
                    <i className="fas fa-shopping-bag"></i> Shop
                  </Link>
                </li>
                <li className="nav-item me-3 position-relative">
                  <Link to="/cart" className="nav-link">
                    <i className="fas fa-shopping-cart"></i> Cart{" "}
                    <span className="position-absolute top-0 start-80 badge bg-danger">
                      {cart.length}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <i className="fas fa-edit"></i> Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                    Signin
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated() && isAuthenticated().role === 0 && (
              <>
                <li className="nav-item">
                  <Link to="/user/dashboard" className="nav-link">
                    <i className="fas fa-user-cog"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/shop" className="nav-link">
                    <i className="fas fa-shopping-bag"></i> Shop
                  </Link>
                </li>
                <li className="nav-item me-3 position-relative">
                  <Link to="/cart" className="nav-link">
                    <i className="fas fa-shopping-cart"></i> Cart{" "}
                    <span className="position-absolute top-0 start-80 badge bg-danger">
                      {cart.length}
                    </span>
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                <i className="fas fa-user-cog"></i> Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );

  return <header id="header">{showNavigation()}</header>;
};

export default Header;
