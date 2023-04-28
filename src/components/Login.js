import React , {useState} from 'react';
import "../static/login.css"
import {account} from "../appwrite/config.js";
import {ID}from "appwrite"
import {useNavigate} from "react-router"

const Login = () => {
    const navigate = useNavigate();

    const navsignup = () => {
         navigate("/signup")
    }




    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [regNo, setRegNo] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Name:', name);
      console.log('Password:', password);
      console.log('Email:', email);
      console.log('Registration No.:', regNo);



      const promise = account.create(ID.unique() , email,password,name)

      promise.then((res) => {
          console.log(res)
      })


    };
  
    return (
      <div className="login-container">
        <h1>Register your account</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label htmlFor="reg_no">Registration No.:</label>
          <input type="text" id="reg_no" name="reg_no" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
          
          <input type="submit" value="Submit" />
        </form>
        <br></br>
        <div>
            After Registering signup here

            <button onClick={navsignup}>Signup</button>
        </div>
      </div>
    );
};

export default Login;