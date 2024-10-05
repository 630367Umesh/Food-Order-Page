// src/components/OrderHistory.js
import React from 'react';

const OrderHistory = ({ orders }) => {
    return (
        <div className="order-history">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                orders.map((order, index) => (
                    <div key={index} className="order">
                        <h3>Order #{index + 1}</h3>
                        <p>Table Number: {order.tableNumber}</p>
                        <p>Contact Number: {order.contactNumber}</p>
                        <p>Date: {order.date}</p>
                        <p>Time: {order.time}</p>
                        <h4>Order Details:</h4>
                        {order.dishes.map((dish, i) => (
                            <div key={i}>
                                <p>{dish.name} - ${dish.price}</p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;
