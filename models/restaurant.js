const Sequelize = require('sequelize');
const database = require('../db_connect');

const Restaurant = database.define('restaurant', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       

        name:{
            type: Sequelize.STRING,
            allowNull: false
        },

        authority:{
            type: Sequelize.STRING,
            allowNull: false,
        },

        email:{
          type: Sequelize.STRING,
          allowNull: false,
        },

        password:{
            type: Sequelize.STRING,
            allowNull: false,
        },

        phone_no:{
            type: Sequelize.STRING
        },

        description:{
            type: Sequelize.STRING
        },

        avatar:{
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


module.exports= Restaurant;