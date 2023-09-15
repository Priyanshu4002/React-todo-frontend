import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';

const Register = () => {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);

const submitHandler= async(e)=>{
    setLoading(true)
    e.preventDefault();
       try {
            const {data} = await axios.post(`${server}/api/v1/users/new`, {
            name,email,password
          }, {
            headers: {
              'Content-Type': 'application/json'
            },
             withCredentials:true,
          }
        )
        setIsAuthenticated(true);
        toast.success(data.message)
        setLoading(false)
        
    } catch (error) {
       toast.error("some error") 
       console.log(error)
       setIsAuthenticated(false);
       setLoading(false)
       }
    
};

    if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className="login">
    <section>
        <form method='POST'>
            <input  
                value={name} 
                required
                onChange={(e)=>setName(e.target.value)} 
                type="text" 
                placeholder='Name' />
            
            <input 
                value={email} 
                required
                onChange={(e)=>setEmail(e.target.value)}
                type="email" 
                placeholder='Email' />

            <input 
                value={password} 
                required
                onChange={(e)=>setPassword(e.target.value)}
                type="password" 
                placeholder='Password' />

            <button type='submit' onClick={submitHandler}>Sign Up</button>
            
            <h4>Or</h4>
            <Link to="/login">Login</Link>
        </form>
    </section>
</div>
  )
}

export default Register
