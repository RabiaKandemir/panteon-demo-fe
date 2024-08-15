import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../Services/UserService';
const RegisterPage = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(30, 'Username must be less than 30 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(15, 'Password must be less than 15 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required'),
    });
    const handleRegister = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await register(values);
            if (response.status === 200) {
                navigate('/login');
            } else {
                setErrors({ submit: 'Registration failed. Please try again.' });
            }
        } catch (err) {
            if (err.response && err.response.data) {
                const errorMessage = err.response.data;
                const businessExceptionMatch = errorMessage.match(/Username already exists|Email already exists/);
                
                if (businessExceptionMatch) {
                    setErrors({ submit: businessExceptionMatch[0] });
                } else {
                    const fieldErrors = {};
                    const errorLines = errorMessage.split('\n').filter(line => line.startsWith(' -- '));
                    errorLines.forEach(line => {
                        const [field, message] = line.replace(' -- ', '').split(': ');
                        const cleanedMessage = message.replace(/Severity.*/, '').trim();
                        const fieldName = field.toLowerCase();
                        fieldErrors[fieldName] = cleanedMessage;
                    });
        
                    setErrors(fieldErrors);
                }
            } else {
                setErrors({ submit: 'Registration failed. Please try again.' });
            }
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <section className="min-vh-100 gradient-custom">
                        <div className="container py-3 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                    <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                        <div className="card-body p-5 text-center">
                                            <div className="mb-md-5 mt-md-4 pb-3">
                                                <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                                <p className="text-white-50 mb-5">Please enter your username, email and password!</p>
                                                
                                                <div className="form-outline form-white mb-4">
                                                    <label className="form-label" htmlFor="username">Username</label>
                                                    <Field
                                                        type="text"
                                                        name="username"
                                                        id="username"
                                                        placeholder="Enter Username"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Enter email"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-outline form-white mb-4">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Enter Password"
                                                        className="form-control form-control-lg"
                                                    />
                                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                                </div>

                                                <button className="btn btn-outline-light btn-lg px-5" type="submit" disabled={isSubmitting}>
                                                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                                </button>

                                                {errors.submit && (
                                                    <div className="alert alert-danger mt-3">{errors.submit}</div>
                                                )}

                                                <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                                    <a href="#!" className="text-white"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
                                                    <a href="#!" className="text-white"><FontAwesomeIcon icon={faTwitter} size="lg" className="mx-4 px-2" /></a>
                                                    <a href="#!" className="text-white"><FontAwesomeIcon icon={faGoogle} size="lg" /></a>
                                                </div>
                                            </div>

                                            <div>
                                                <Link className='link' to="/login">Sign In</Link>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterPage;
