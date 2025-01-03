import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../apollo/mutations';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ variables: formData });
      if (response && response.data) {
        console.log('Registration Success:', response.data);
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration Failed:', err.message);
      // Set the error message from the backend
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {/* Display error messages */}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {error && !errorMessage && <p className="error">{error.message}</p>}
      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </div>
  );
};

export default Register;
