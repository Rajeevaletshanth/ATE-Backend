const Sequelize = require('sequelize');
const database = require('../db_connect');


const Favourite = database.define('favourite', {

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

        product_id:{
            type: Sequelize.INTEGER,
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

module.exports= Favourite;