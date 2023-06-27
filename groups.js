const  Sequelize  = require('sequelize');
const sequelize = require('./database');

const Groups = sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    
    
      adminid:{
        type:Sequelize.STRING,
        allowNull: false

      }
,
groupName:{
  
  type:Sequelize.STRING,
  allowNull: false

}

    
    
    
});


module.exports =  Groups;