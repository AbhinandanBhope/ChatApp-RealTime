const  Sequelize  = require('sequelize');
const sequelize = require('./database');

const usergrops = sequelize.define('usergrops',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    
    isAdmin:{
        type:Sequelize.BOOLEAN

    },
    GroupName:{
        type:Sequelize.STRING,
        allowNull: false,

    },
    memberName:{
        type:Sequelize.STRING,
        allowNull: false,
    } ,



    
    
    
});


module.exports =  usergrops;