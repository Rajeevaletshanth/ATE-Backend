const Sequelize = require('sequelize');
const database = require('../db_connect');

const Table = database.define('table', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    table_no: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    table_type: {
        type: Sequelize.STRING
    },

    seat_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    qr_code: {
        type: Sequelize.STRING
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


module.exports = Table;