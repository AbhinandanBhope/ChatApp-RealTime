const User = require('../User');


const jwt = require('jsonwebtoken');
const { where, Error } = require('sequelize');
const sib = require('sib-api-v3-sdk');
const uuid = require('uuid');
const bcrypt = require('bcrypt');


const forgotpassword = require('../forgotPassword');

 require('dotenv').config();


 

const ForgotPass = async function (req, res, next) {

    try {  
        const Gmail = req.params.Gmail;
        const user = await User.findOne({where : { Gmail }});
        if(user != null){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

        const client = sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey =process.env.API_KEY
        console.log(process.env.API_KEY)
        const tranEmailApi =new sib.TransactionalEmailsApi();
      const   sender ={
            email:'abhinandanbhope@gmail.com'
        }
      
        const receivers = [ {
            email: Gmail
        },
    ]
    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:"Otp",
        textContent:"Hi",

        htmlContent: ` <h1>HI</h1>
        <a href="http://http://localhost:3000/password/resetpassword/${id}">Reset password</a>`


    })
    

        console.log(req.params.Gmail);
        
        res.status(201).json({});
        
    
        
        

      }
      else {
        res.status(500).json({});
      }
    }
    catch(err){
        console.log(err)
        return res.status(404).json({})
        
    }
}
const ResetPass = async function (req, res, next) {
    try {
        const id = req.params.id;
        forgotpassword.findOne({ where: { id } }).then(forgotpasswordrequest => {
            if (forgotpasswordrequest) {
                forgotpasswordrequest.update({ active: false });
                res.status(200).send( `<html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f2f2f2;
                            }
                
                            .container {
                                max-width: 400px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #fff;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                            }
                
                            h1 {
                                text-align: center;
                            }
                
                            form {
                                display: flex;
                                flex-direction: column;
                            }
                
                            label {
                                margin-bottom: 10px;
                            }
                
                            input[type="password"] {
                                padding: 10px;
                                margin-bottom: 10px;
                                border: 1px solid #ccc;
                                border-radius: 3px;
                            }
                
                            button {
                                padding: 10px 20px;
                                background-color: #4CAF50;
                                color: #fff;
                                border: none;
                                border-radius: 3px;
                                cursor: pointer;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Reset Password</h1>
                            <form action="/password/updatepassword/${id}" method="get">
                                <label for="newpassword">Enter New Password</label>
                                <input name="newpassword" type="password" required>
                                <button>Reset Password</button>
                            </form>
                        </div>
                    </body>
                </html>
                `)
                res.end();
            }
        });
    } catch (err) {
        console.log(err);
    }
};
const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


module.exports ={
ForgotPass ,ResetPass ,updatepassword
}
