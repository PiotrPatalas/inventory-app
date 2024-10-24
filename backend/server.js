// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Product } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
