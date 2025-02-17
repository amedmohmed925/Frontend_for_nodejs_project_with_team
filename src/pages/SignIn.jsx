import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser} from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card bg-secondary text-light p-4 shadow-lg w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-3">Sign In</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-3">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
           <Link className='text-light' to={"/signup"}><span>Or Create Account?</span></Link>
        </form>
      </div>
    </div>
  );
};

export default Login