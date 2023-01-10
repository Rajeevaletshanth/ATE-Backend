const Sequelize = require('sequelize');
const database = require('../db_connect');


const TopOffers = database.define('top_offers', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    type: {
        type: Sequelize.STRING,
        allowNull: false
    },

    top_offer: {
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

module.exports = TopOffers;