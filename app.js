

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');




//const Sequelize = require('./database');


const socketio = require('socket.io');
const app = express();
 
const http = require("http").createServer(app);
const io = require("socket.io")(http);
//app.use(cors())

const adminRoutes = require('./routes/admin');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./User');
const Message = require('./mrssages');
const usergrops = require('./Usergroups');
const groups = require('./groups');
const Archived =require('./ArchivedChat');

const CronJob = require("cron").CronJob;


const forgotPassword = require('./forgotPassword');

const routes =require('./routes/admin');

app.use(routes);

app.use(cors({
  origin:"*",
  credentials:true,
  methods: "GET, POST, PUT, DELETE"
})); 


//app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'CSS')))
app.use((req,res) =>{
  res.sendFile(path.join(__dirname,`public${req.url}`))
})





 


/*db.execute('SELECT * FROM users').
then(result => {
  console.log(result);
  
}).catch(err => {
  console.log(err);
  
}); */




app.use(adminRoutes);
app.use(express.json()); 

  



  /*app.delete('/delete/:Id',  async (req, res) => {
    try{
    const id1 = req.params.Id.replace(':', ''); // Remove the colon from the ID
   const data2 = await  User.destroy({ where: { id: id1 } })
   console.log(data2);
   res.status(201).json({data2});
    }
      
      catch(err)  {
        console.log(err);
      };
  }); */
  
  
  
  
  
  

  
  
  User.hasMany(forgotPassword);
forgotPassword.belongsTo(User);
User.hasMany(Message);
Message.belongsTo(User);
User.belongsToMany(groups,{ through:usergrops});
groups.belongsToMany(User,{through:usergrops});
groups.hasMany(Message);
Message.belongsTo(groups);

app.use((req ,res) =>{
  res.sendFile(path.join(__dirname,`${req.url}`));

})









app.use(bodyParser.urlencoded({ extended: true }));


  io.on("connection", (socket) => {
    try {
      socket.on("message", (obj2) => {
        console.log("emit");
        console.log(obj2);
        socket.broadcast.emit("message", obj2.Message, obj2.groupId,obj2.userId, obj2.Name);
      });
    //  socket.on("file", (msg, username,id) => {
      //  console.log("file")
       // socket.broadcast.emit("file", msg, username,id);
     // });
    } catch (err) {
      console.log(err);
    }
  });
  
 const job = new CronJob(
  "0 36 3 * * *",
    async function () {
      const t = await sequelize.transaction();
  
      try {                                                          
        const data = await Message.findAll();
        data.forEach(async (element) => {
          await Archived.create(
            {
              
              Message : element.Message,
              Name: element.Name,
              userId: element.userId,
              groupId: element.groupId,
            },
            { transaction: t }
          );
        });
        await Message.destroy({ where: {} }, { transaction: t });
        await t.commit();
      } catch (err) {
        await t.rollback();
  
        console.log(err);
      }
    },
    null,
    true
  ); 
  







   
    
sequelize
.sync(
// {force:true}
)
.then(http.listen(3000))
.catch((err) => {
  console.log(err);
});



  



















