import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage'
import ConfigurationPage from './Pages/ConfigurationPage'
import LoginPage from './Pages/LoginPage'
import PrivateRoute from './Component/PrivateRoute';

function App() {
  
  return (

    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
                path="/config" 
                element={
                    <PrivateRoute>
                        <ConfigurationPage />
                    </PrivateRoute>
                } 
            />
      <Route path="/" element={<LoginPage />} />
    </Routes>

  );
}

export default App;
