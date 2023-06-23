document.getElementById('forgotGmail').onclick = ForgotPassword;
 async function ForgotPassword(){
  const  token =localStorage.getItem('token')
  const Gmail = document.getElementById('Gmail').value;
  
  axios.get(`http://http://localhost:3000/password/forgotpassword/${Gmail} ` ,{headers:{"Authorization":token}})
  .then(res => {
  
  console.log(res.status);
  if(res.status == 500){
    alert('Email not found')
  }


    
        
          

        
            

  

  
  
  
  
  
  
  // Handle successful response
  })
  .catch(error => {
  // Handle error
  alert("This email is not found")
  console.log(error);
  });
  

}