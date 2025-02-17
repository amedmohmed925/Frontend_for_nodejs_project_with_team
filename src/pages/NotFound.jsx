import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="Not Found"
        className="img-fluid mb-3"
        style={{ maxWidth: "300px" }}
      />

      <i className="bi bi-exclamation-triangle-fill text-danger display-1"></i>

      <h2 className="text-danger fw-bold mt-3">404 - Page Not Found</h2>
      <p className="text-muted">
        Oops! The page you are looking for does not exist.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        <i className="bi bi-house-door-fill me-2"></i> Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
