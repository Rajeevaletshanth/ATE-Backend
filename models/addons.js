const Sequelize = require('sequelize');
const database = require('../db_connect');

const Addons = database.define('addons', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        
        restaurant_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },

        price:{
            type: Sequelize.FLOAT,
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

module.exports= Addons;