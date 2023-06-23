const  Sequelize  = require('sequelize');
const sequelize = require('./database');

const Message = sequelize.define('Messages',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    
    
    Message: {
        type:Sequelize.STRING,
        allowNull: false,
         // Make Gmail column unique
      },


    
    
    
});


module.exports =  Message;