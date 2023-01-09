const Sequelize = require('sequelize');
const database = require('../db_connect');


const Order = database.define('order', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       

        user_id:{
            type: Sequelize.INTEGER,
        },

        restaurant_id:{
            type: Sequelize.INTEGER,
        },

        products:{
            type: Sequelize.STRING,
            allowNull: false
        },

        order_date:{
            type: Sequelize.DATE,
        },

        order_time:{
            type: Sequelize.TIME,
        },

        delivery_fee:{
            type: Sequelize.FLOAT,
        },

        total_amount:{
            type: Sequelize.FLOAT,
        },

        status:{
            type: Sequelize.STRING,
        },

        is_deleted:{
          type: Sequelize.BOOLEAN,
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

module.exports= Order;