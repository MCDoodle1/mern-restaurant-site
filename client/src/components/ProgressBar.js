import { Link } from "react-router-dom";

const ProgressBar = ({ step1, step2, step3 }) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {step1 ? (
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/shipping" style={{ textDecoration: "none" }}>
                Shipping
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to="/#"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none", cursor: "not-allowed" }}
                className="text-muted"
              >
                Shipping
              </Link>
            </li>
          )}
          {step2 ? (
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/payment" style={{ textDecoration: "none" }}>
                Payment
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to="/#"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none", cursor: "not-allowed" }}
                className="text-muted"
              >
                Payment
              </Link>
            </li>
          )}
          {step3 ? (
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/placeorder" style={{ textDecoration: "none" }}>
                Place Order
              </Link>
            </li>
          ) : (
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to="/#"
                onClick={(e) => e.preventDefault()}
                style={{ textDecoration: "none", cursor: "not-allowed" }}
                className="text-muted"
              >
                Place Order
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </>
  );
};

export default ProgressBar;
