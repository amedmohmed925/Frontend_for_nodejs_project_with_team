import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Signup.css';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
            await dispatch(registerUser(formData)).unwrap();
            navigate('/signin');
        } catch (err) {
            setError('Failed to sign up. Please try again.');
        }
        setLoading(false);
    };
  
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="text-center mb-3">Create an Account</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            name="name" 
                            className="form-control input-focus"
                            id="floatingName"
                            placeholder="Full Name"
                            onChange={handleChange} 
                            required 
                        />
                        <label htmlFor="floatingName" className="text-light">Full Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control input-focus"
                            id="floatingEmail"
                            placeholder="Email"
                            onChange={handleChange} 
                            required 
                        />
                        <label htmlFor="floatingEmail" className="text-light">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control input-focus"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={handleChange} 
                            required 
                        />
                        <label htmlFor="floatingPassword" className="text-light">Password</label>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-success w-100 btn-hover"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
