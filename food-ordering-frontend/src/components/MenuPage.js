import React, { useState, useEffect } from 'react';
import DishCard from './DishCard';
import '../styles/App.css';

const MenuPage = () => {
    const [order, setOrder] = useState([]);
    const [tableNumber, setTableNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('https://api.jsonbin.io/v3/b/66faa41facd3cb34a88ed968');
                const data = await response.json();
                setMenuItems(data.record);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const addToOrder = (item) => {
        if (item.available_quantity > 0) {
            const updatedMenuItems = menuItems.map(menuItem => {
                if (menuItem.id === item.id) {
                    // Update the available quantity
                    const updatedQuantity = menuItem.available_quantity - 1;
                    return { ...menuItem, available_quantity: updatedQuantity };
                }
                return menuItem;
            });

            // Check if item already exists in order
            const existingItemIndex = order.findIndex(orderItem => orderItem.id === item.id);
            if (existingItemIndex !== -1) {
                // Increase the quantity in the order
                const updatedOrder = [...order];
                updatedOrder[existingItemIndex].quantity += 1;
                setOrder(updatedOrder);
            } else {
                // Add new item to order
                setOrder([...order, { ...item, quantity: 1 }]);
            }

            setMenuItems(updatedMenuItems);
        } else {
            alert('This item is currently unavailable.');
        }
    };

    const placeOrder = async () => {
        if (tableNumber && date && time) {
            const orderDetails = {
                order,
                tableNumber,
                contactNumber,
                date,
                time,
            };

            try {
                const response = await fetch('http://localhost:5000/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails),
                });

                if (response.ok) {
                    alert('Order placed successfully!');
                    setOrderHistory([...orderHistory, orderDetails]);
                    setOrder([]); // Reset current order
                    setTableNumber(''); // Reset table number
                    setContactNumber(''); // Reset contact number
                    setDate(''); // Reset date
                    setTime(''); // Reset time
                } else {
                    console.error('Failed to place order:', response.statusText);
                }
            } catch (error) {
                console.error('Error placing order:', error);
            }
        } else {
            alert('Please fill in all the details.');
        }
    };

    return (
        <div className="menu-page">
            <h1>Menu</h1>
            <div className="menu-list">
                {menuItems.map(item => (
                    <DishCard key={item.id} dish={item} addDishToOrder={addToOrder} />
                ))}
            </div>

            <div className="order-details">
                <h2>Place Order</h2>
                <input
                    type="text"
                    placeholder="Table Number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
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
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button onClick={placeOrder}>Place Order</button>
            </div>

            {/* Order History Section */}
            <div className="order-history">
                <h2>Order History</h2>
                {orderHistory.length === 0 ? (
                    <p>No orders placed yet.</p>
                ) : (
                    <ul>
                        {orderHistory.map((orderItem, index) => (
                            <li key={index}>
                                <strong>Table Number:</strong> {orderItem.tableNumber},
                                <strong>Contact:</strong> {orderItem.contactNumber || 'N/A'},
                                <strong>Date:</strong> {orderItem.date},
                                <strong>Time:</strong> {orderItem.time}
                                <ul>
                                    {orderItem.order.map((dish, idx) => (
                                        <li key={idx}>
                                            {dish.name} - Quantity: {dish.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MenuPage;
