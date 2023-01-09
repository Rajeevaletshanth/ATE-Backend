const Sequelize = require('sequelize');
const database = require('../db_connect');

const ComboMenu = database.define('combo_menu', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
    },

    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    discount: {
        type: Sequelize.FLOAT,
    },

    avatar: {
        type: Sequelize.STRING,
    },

    is_deleted: {
        type: Sequelize.BOOLEAN
    },

    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },

    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    }
}, {
    // options
    freezeTableName: true
});

// Admin.sync({ force: true })

module.exports = ComboMenu;