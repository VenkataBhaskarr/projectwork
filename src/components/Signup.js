import React , {useState} from 'react';
import "../static/login.css"
import {account, databases} from "../appwrite/config.js";
import {ID}from "appwrite"
import { RestoreOutlined } from '@mui/icons-material';




function Signup(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reg, setReg] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      try{
        const promise = account.createEmailSession(email , password)

        promise.then(
            function(res){
              
                console.log(res);
                const result = databases.createDocument("642cce9608cce873a006" , "642cd0e8e598fa603e2f" , res.userId,{
                     Name : name,
                     gender : name,
                     age : reg,
                     email : email,
                   })

                   result.then((res) => {
                     console.log(res)
                   })
                })
     }
     catch(err){
        console.log(err)
     }
    };
  
    return (
      <div className="login-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"> Name : </label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label htmlFor="regno">RegNo:</label>
          <input type="text" id="text" name="text" value={reg} onChange={(e) => setReg(e.target.value)} required />
          
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default Signup;