const  Sequelize  = require('sequelize');
const sequelize = require('./database');

const Archived= sequelize.define('archived',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    
    
    Message: {
        type:Sequelize.STRING(5000),
        allowNull: false,
         // Make Gmail column unique
      },
      Name:{
        type:Sequelize.STRING,
        allowNull: false

      },
      userId:{
        type:Sequelize.INTEGER,
        allowNull: false
      },
      groupId:{ type:Sequelize.INTEGER,
        allowNull: false

      }



    
    
    
});


module.exports =  Archived;