const Sequelize = require('sequelize');
const database = require('../db_connect');


const Cuisines = database.define('cuisines', {

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       

        name:{
            type: Sequelize.STRING,
            allowNull: false
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

module.exports= Cuisines;