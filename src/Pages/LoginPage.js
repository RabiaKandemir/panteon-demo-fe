import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../css/login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { login } from '../Services/UserService';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate("/config");
            } else {
                setError('Login failed. Please check your username and password.');
            }
        } catch (err) {
            setError('Login failed. Please check your username and password.');
        }
    };
    return (
        <form onSubmit={handleLogin}>
            <section className="min-vh-100  gradient-custom">
                <div className="container py-3 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your username and password!</p>
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Enter Username"
                                                className="form-control form-control-lg"
                                            />
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter Password"
                                                className="form-control form-control-lg"
                                            />
                                        </div>

                                        <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                        <button className="btn btn-outline-light btn-lg px-3" type="submit">Login</button>

                                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                            <a href="#!" className="text-white"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
                                            <a href="#!" className="text-white"><FontAwesomeIcon icon={faTwitter} size="lg" className="mx-4 px-2" /></a>
                                            <a href="#!" className="text-white"><FontAwesomeIcon icon={faGoogle} size="lg" /></a>
                                        </div>
                                    </div>

                                    <div>
                                        <p>Don't have an account? <Link className='link' to="/register">Sign Up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
        </form>
    );
};

export default LoginPage;
