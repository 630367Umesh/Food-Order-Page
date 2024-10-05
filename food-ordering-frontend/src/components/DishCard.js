import React from 'react';


const DishCard = ({ dish, addDishToOrder }) => {
    return (
        <div className="dish-card">
            <h3>{dish.name}</h3>
            <p>Price: ${dish.price}</p>
            <p>Available Quantity: {dish.available_quantity}</p> {/* Show available quantity */}
            <button 
                onClick={() => addDishToOrder(dish)} 
                disabled={dish.available_quantity <= 0} // Disable if no available quantity
            >
                Add to Order
            </button>
        </div>
    );
};

export default DishCard;
