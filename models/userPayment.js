const Sequelize = require('sequelize');
const database = require('../db_connect');

const UserPayment = database.define('user_payment', {

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

        payment_intent_id: {
            type: Sequelize.STRING,
            allowNull: false
        },

        product_name:{
            type: Sequelize.STRING
        },

        product_id:{
            type: Sequelize.STRING
        },

        amount:{
            type: Sequelize.STRING,
            allowNull: false,
        },

        status:{
            type: Sequelize.STRING
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


module.exports= UserPayment;