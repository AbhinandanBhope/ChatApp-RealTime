

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const compression = require('compression');

//const Sequelize = require('./database');
const app = express();

//app.use(cors())

const adminRoutes = require('./routes/admin');
var cors = require('cors');
const sequelize = require('./database');
const User = require('./User');


const forgotPassword = require('./forgotPassword');

const routes =require('./routes/admin');
app.use(routes);

app.use(cors());


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

app.use((req ,res) =>{
  res.sendFile(path.join(__dirname,`${req.url}`));

})









app.use(bodyParser.urlencoded({ extended: false}));
sequelize.sync().then((result) => {

  console.log(result)
   app.listen(3000);
}).catch((err) => {
  console.log(err)
  
});





    
   
    



