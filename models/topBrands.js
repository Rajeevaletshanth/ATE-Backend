const Sequelize = require('sequelize');
const database = require('../db_connect');


const TopBrands = database.define('top_brands', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    top_brand: {
        type: Sequelize.BOOLEAN
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

module.exports = TopBrands;