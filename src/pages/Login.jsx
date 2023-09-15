import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
  
  const loginHandler= async(e)=>{
    setLoading(true)
      e.preventDefault();
         try {
              const {data} = await axios.post(`${server}/api/v1/users/login`, {
              email,password
            }, {
              headers: {
                'Content-Type': 'application/json'
              },
               withCredentials:true,
            }
          )
          toast.success(data.message)
          setLoading(false)
          setIsAuthenticated(true);
          
      } catch (error) {
         toast.error(error.response.data.message) 
         console.log(error)
         setIsAuthenticated(false);
         setLoading(false)
         }
      
  };

    if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className="login">
        <section>
            <form >
                <input value={email} 
                required
                onChange={(e)=>setEmail(e.target.value)}
                type="email" 
                placeholder='Email' />

                <input value={password} 
                required
                onChange={(e)=>setPassword(e.target.value)}
                type="password" 
                placeholder='Password' />

                <button disabled={loading} type='submit' onClick={loginHandler}>Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign Up</Link>
            </form>
        </section>
    </div>
  )
}

export default Login
