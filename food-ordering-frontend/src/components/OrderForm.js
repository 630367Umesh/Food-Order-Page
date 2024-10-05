// src/components/OrderForm.js
import React, { useState } from 'react';

const OrderForm = ({ order, placeOrder }) => {
    const [tableNumber, setTableNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        placeOrder({ tableNumber, contactNumber, date, time, order });
        // Clear form after submission
        setTableNumber('');
        setContactNumber('');
        setDate('');
        setTime('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Place Your Order</h2>
            <input
                type="text"
                placeholder="Table Number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Contact Number (optional)"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;
