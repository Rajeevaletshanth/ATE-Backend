const Sequelize = require('sequelize');
const database = require('../db_connect');


const UserPaymentCustomer = database.define('user_payment_customer', {

        // attributes
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       

        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        customer_id: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        is_deleted:{
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


module.exports= UserPaymentCustomer;