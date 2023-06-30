const User = require('../User');
const bcrypt = require('bcrypt');
const Message = require('../mrssages')
const Groups = require('../groups');
const { Op } = require('sequelize');
const usergroup1 =  require('../Usergroups');
const jwt = require('jsonwebtoken');
const sequelize = require('../database');
require('dotenv').config();






 
const postUser = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  
  try {
    const id = 2;
    const Name1 = req.body.Name1;
    const gmail1 = req.body.gmail1;
    const password = req.body.password;

    if (Name1.length === 0 || gmail1.length === 0 || password.length === 0) {
      res.status(404).json({ error: 'An error occurred while creating a user' });
    }

    console.log(Name1);
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const data = await User.create({
      Name: Name1,
      Gmail: gmail1,
      password: hashedPassword ,
      active: false
    }, { transaction });

    await transaction.commit();

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};

function generateToken(id ) {
  return jwt.sign({userId:id } ,'key')
}

const logout = async function (req ,res ,next) {
  try {
    
    const activeUpdate = await User.update(
      { active: false }, 
      { where: { id: req.userId } }
    );
    console.log(activeUpdate);
    
    
  } catch (error) {
    
  }
  
}
 

const LoginUser = async function (req, res, next) {
  try {
    
    const Name1= req.params.Name;
  
    const gmail1 = req.params.gmail;
    const password1 = req.params.password ;
    console.log(gmail1);
    
   const user = await User.findAll({
      where: {
        Gmail: gmail1,
        Name:Name1,
        
        
      }
    }); 
    
    const activeUpdate = await User.update(
      { active: true }, 
      { where: { id: user[0].id } }
    );
    console.log(activeUpdate);
    

    userId = user[0].id;
    if(user.length != 0){
    
      bcrypt.compare(password1,user[0].password, async (err,result) =>{
        if(err){
          return  res.status(404);

        }
        if(result === true){
         const token = generateToken(user[0].id);
          
            return res.status(201).json({ Name1, token });

        }
        else{
          console.log(err);
          return res.status(400).json({})
        }

      }) 
      
      
    }
    else if(user){

      res.status(404).json({ Name1});
    }

    console.log(Name1);
    
    
  } catch (err) {
    console.log(err);
  


    res.status(500).json({ error: 'An error occurred while creating a user' });
    
  }
};

  


    

    
  
    

const onlineUser =  async function(req, res)  {
  try{
  
    const g = req.params.GroupId;
    const dtat5 = await usergroup1.findAll({
      where:{ GroupId: g}
    })
      
      res.status(201).json({dtat5});
      console.log(dtat5);
      
  }
  
    catch(err)  {
      res.status(500);
      console.log(err)
      
    };
    
  };

    
const postMessage = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  
  try {
    const groupId = req.params.groupId;
    const u =  req.user.id;
    const UserM = await User.findAll({
      where:{ id: u}
      
    })  
      console.log( UserM);
    
    const Message2 = req.body.Message1;
    

    if (Message2.length==0) {
      res.status(500).json({ error: 'Please Write something' });
    }

    
    
    
    const data = await Message.create({
      Message:Message2,
      Name: UserM[0].Name,
      userId:u ,
      groupId: groupId
    
    
    }, { transaction });

    await transaction.commit();

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};


    
const ShowMessage = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  
  const messageId = req.params.messageId;
  const gropid = req.params.groupId;
  try {
    const u2 = req.user.id;
  
    

    
    
    
    const data = await Message.findAll({ 
      
       where: {id: {
        [Op.gt]: messageId
      },
      groupId :gropid

      
    }
      

}, { transaction });

    await transaction.commit();

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};

      
      

    
const creatgroup = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  
  try {
    const u = req.user.id;
    const UserM = await User.findAll({
      where:{ id: u}
      
    })  
      console.log( UserM);
    
    const GroupN = req.body. GroupName1;
    

    if (GroupN.length==0) {
      res.status(500).json({ error: 'Please Write something' });
    }

    
    
    
    const data = await Groups.create({
      
      userId:u ,
      adminid: UserM[0].id ,
      groupName: GroupN
    }, { transaction });
    await transaction.commit();
    const data2 = await usergroup1.create({
      
      isAdmin:true ,
       
      GroupName:GroupN,
      memberName:UserM[0].Name,
      userId: UserM[0].id,

      groupId: data.id
    })

    
    console.log(data2);

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};

const showgroups = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  
  const messageId = req.params.messageId;
  try {
    const u2 = req.user.id;
    
    

    
    
    
    const data = await usergroup1.findAll({ 
      where:{userId:u2}
}, { transaction });

    await transaction.commit();

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};

    
const addMember = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  const GroupN =req.body.GroupName1;
  const uName = req.body.MemberName1;
  console.log(GroupN);
  
  try {
 
    const UserM = await User.findAll({
      where:{ Name: uName}
      
    })  
      console.log( UserM);
    
    
    

    if (uName.length==0 || GroupN == null) {
      res.status(401).json({ error: 'User Not found' });
    }
    const gObj = await Groups.findAll({
      where:{ id: GroupN}
      
    })  
    
    console.log("myObj "+gObj[0].groupName);
    
    const data4 = await usergroup1.findAll({
      where:{ 
        userId: req.user.id ,
        groupId: GroupN
      }
    })
  if(data4.isAdmin == false){
    res.status(402);
  }
    const data = await usergroup1.create({
      
      isAdmin:false ,
      GroupName: gObj[0].groupName ,
      memberName:UserM[0].Name,
      userId: UserM[0].id ,
      groupId: GroupN
    }, { transaction });
    await transaction.commit();
    

    
    

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};
    
const removeMember = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  const GroupN1 = req.params.GroupName2;
  const uName1 = req.params.MemberName2;
  console.log("req"+req.body);
  console.log(JSON.stringify(req.body));
  
  try {
 
    const UserMd = await User.findAll({
      where:{ Name: uName1}
      
    })  
      console.log( UserMd);
    
    
    

    if (uName1.length==0 || GroupN1== null) {
      res.status(401).json({ error: 'User Not found' });
    }
    const gObjd = await Groups.findAll({
      where:{ id: GroupN1}
      
    })  
    const data4 = await usergroup1.findAll({
      where:{ 
        userId: req.user.id,
        groupId: GroupN1
      }
    })
  if(data4.isAdmin == false){
    res.status(402);
  }

    console.log("myObj "+gObjd[0].groupName);
    
    
    const data = await usergroup1.destroy({
      where:{
        
        GroupName: gObjd[0].groupName ,
        memberName:UserMd[0].Name,
        userId: UserMd[0].id ,
        groupId: GroupN1}
      
    }, { transaction });
    await transaction.commit();
    

    
    

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};

    
const addAdmin = async function (req, res, next) {
  const transaction = await sequelize.transaction();
  const GroupN =req.body.GroupName1;
  const uName = req.body.MemberName1;
  console.log(GroupN);
  
  try {
 
    const UserM = await User.findAll({
      where:{ Name: uName}
      
    })  
      console.log( UserM);
    
    
    

    if (uName.length==0 || GroupN == null) {
      res.status(401).json({ error: 'User Not found' });
    }
    const gObj = await Groups.findAll({
      where:{ id: GroupN}
      
    })  
    
    console.log("myObj "+gObj[0].groupName);
    
    const data4 = await usergroup1.findAll({
      where:{ 
        userId: req.user.id ,
        groupId: GroupN
      }
    })
  if(data4.isAdmin == false){
    res.status(402);
  }
    const data = await usergroup1.update(
      { isAdmin:true },
      { where: { userId: UserM[0].id,
        groupId:GroupN

      } }
    
       , { transaction });
    await transaction.commit();
    

    
    

    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    await transaction.rollback();

    res.status(500).json({ error: 'An error occurred while creating a user' });
  }
};





module.exports = {
  postUser, LoginUser  ,  onlineUser , logout ,postMessage ,ShowMessage ,creatgroup ,showgroups ,addMember ,removeMember, addAdmin
  
};
