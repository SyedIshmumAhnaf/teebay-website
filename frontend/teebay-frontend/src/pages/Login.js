import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../apollo/mutations';


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: ""});
  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION); // Extract data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ variables: formData });
        if(response && response.data){
          console.log('Login Success:', response.data);
          localStorage.setItem('token', response.data.login.token)
        }
    } catch (err) {
      console.error('Login Failed:', err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="error">{error.message}</p>}
      <p>
        Don't have an account? <a href="/register">Signup</a>
      </p>
    </div>
  );
};

export default Login;