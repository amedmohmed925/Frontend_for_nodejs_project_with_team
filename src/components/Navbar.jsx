
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice"; 
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log(user.name);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4">MovieApp - Home</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/watch-later" className="nav-link">Watch Later</Link>
            </li>
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <li className="nav-item">
                    <Link to="/AddMovie" className="btn btn-primary me-3">➕ إضافة فيلم</Link>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link text-light">👤 {user?.name}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger ms-3">Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/signin" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
