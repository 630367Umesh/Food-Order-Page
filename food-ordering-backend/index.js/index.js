// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/orders', (req, res) => {
    const orderDetails = req.body;
    console.log('Order received:', orderDetails);
    res.status(201).json({ message: 'Order placed successfully!', orderDetails });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
