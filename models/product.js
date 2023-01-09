const Sequelize = require('sequelize');
const database = require('../db_connect');

const Product = database.define('product', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },

        category_id:{
            type: Sequelize.INTEGER,
        },

        restaurant_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },

        description:{
            type: Sequelize.STRING,
        },

        price:{
            type: Sequelize.FLOAT,
        },

        addons:{
            type: Sequelize.STRING,
        },

        vegetarian: {
            type: Sequelize.BOOLEAN,
        },

        avatar:{
            type: Sequelize.STRING,
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

// Admin.sync({ force: true })

module.exports= Product;