const {DataTypes} = require('sequelize');
const db = require('../config/database.js');

const Quotes = db.define('quotes', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    quote: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Quotes;