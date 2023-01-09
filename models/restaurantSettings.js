const Sequelize = require('sequelize');
const database = require('../db_connect');

const RestaurantSettings = database.define('restaurant_settings', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    website: {
        type: Sequelize.STRING,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    phone_no: {
        type: Sequelize.STRING,
    },

    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    longitude: {
        type: Sequelize.STRING,
    },

    latitude: {
        type: Sequelize.STRING,
    },

    avatar: {
        type: Sequelize.STRING,
    },

    currency: {
        type: Sequelize.STRING,
    },

    cuisines: {
        type: Sequelize.STRING,
    },

    vegetarian: {
        type: Sequelize.BOOLEAN,
    },

    service_type: {
        type: Sequelize.STRING,
    },

    default_language: {
        type: Sequelize.STRING,
    },

    opening_hours: {
        type: Sequelize.STRING,
    },

    terms_and_conditions: {
        type: Sequelize.STRING,
    },

    bank_name: {
        type: Sequelize.STRING,
    },

    iban: {
        type: Sequelize.STRING,
    },

    delivery_fee: {
        type: Sequelize.FLOAT,
    },

    orderlimit_min: {
        type: Sequelize.FLOAT,
    },

    facebook: {
        type: Sequelize.STRING,
    },

    instagram: {
        type: Sequelize.STRING,
    },

    pinterest: {
        type: Sequelize.STRING,
    },

    vimeo: {
        type: Sequelize.STRING,
    },
    
    youtube: {
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


module.exports = RestaurantSettings;