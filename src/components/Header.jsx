import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
  
  const logoutHandler= async()=>{
    setLoading(true)
    try {
         const {data} = await axios.get(`${server}/api/v1/users/logout`, 
         { withCredentials:true,
         }
     )
     setIsAuthenticated(false);
     toast.success(data.message)
     setLoading(false) 
       
 } catch (error) {
    toast.error(error.response.data.message) 
    console.log(error)
    setIsAuthenticated(true);
    }
 
};
  
  return (
   <nav className="header">
    <div>
        <h2>Todo App.</h2>
    </div> 
    <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {
          isAuthenticated? <button disabled={loading} className='btn' onClick={logoutHandler}>Log out</button> :<Link to={"/login"}>Login</Link>
        }
        
    </article>
   </nav>
  )
}

export default Header
