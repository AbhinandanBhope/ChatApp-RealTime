const jwt = require('jsonwebtoken');
const User = require('./User');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    console.log(token);
   const  user = jwt.verify(token, 'key');
    console.log(user.userId);
    User.findByPk(user.userId)
      .then((user) => {
        console.log(user.data);
        
         
          
          // Include other properties as needed
        
        req.user = user;
        console.log('user='+ req.user.id);
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ message: false });
      });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: false });
  }
};

module.exports = { authenticate };
