// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Router>
      <MainLayout>
        <h1>Hi, Welcome to react frontend.</h1>
        <Link to='/login'>Login</Link>&nbsp;
        <Link to='/register'>Register</Link>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
