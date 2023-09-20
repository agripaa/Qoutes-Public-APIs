const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DB,
    dialectModule: mysql2,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

module.exports = db;