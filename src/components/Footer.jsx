import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark border-top border-black text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} MovieApp. All Rights Reserved.</p>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <a href="#" className="text-light fs-4">
            <FaFacebook />
          </a>
          <a href="#" className="text-light fs-4">
            <FaTwitter />
          </a>
          <a href="#" className="text-light fs-4">
            <FaInstagram />
          </a>
        </div>
        <p className="small">Designed with ❤️ for movie lovers</p>
      </div>
    </footer>
  );
};

export default Footer;
