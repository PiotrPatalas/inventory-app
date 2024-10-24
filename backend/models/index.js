// models/index.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'inventory',
  process.env.POSTGRES_USER || 'user',
  process.env.POSTGRES_PASSWORD || 'password',
  {
    host: 'db', // nazwa usługi w docker-compose
    dialect: 'postgres',
  }
);

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Synchronizacja modeli z bazą danych
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize, Product };
