const Sequelize = require('sequelize');
const database = require('../db_connect');

const TableReservation = database.define('table_reservation', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    table_ids: {
        type: Sequelize.STRING,
        allowNull: false
    },

    customer_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    customer_phone: {
        type: Sequelize.STRING,
        allowNull: false
    },

    customer_email: {
        type: Sequelize.STRING
    },

    guests_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    reservation_date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    reservation_from: {
        type: Sequelize.TIME,
        allowNull: false
    },

    reservation_to: {
        type: Sequelize.TIME,
        allowNull: false
    },

    note: {
        type: Sequelize.STRING
    },

    status: {
        type: Sequelize.STRING,
        allowNull: false
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


module.exports = TableReservation;