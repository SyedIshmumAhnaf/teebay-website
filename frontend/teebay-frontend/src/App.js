 // App.js
 import React from 'react';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Login from './pages/Login';
 import Register from './pages/Register';
 import MainLayout from './layouts/MainLayout';
 
 
 const App = () => {
   return (
     <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MainLayout>
     </Router>
   );
 };
 
 export default App;