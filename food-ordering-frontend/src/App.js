// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import OrderHistory from './components/OrderHistory';
import './styles/App.css'; // Ensure this path is correct

const App = () => {
    return (
        <Router>
            <div className="app">
                <h1>Food Ordering System</h1>
                <Routes>
                    <Route path="/" element={<MenuPage />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
