import React, { useContext, useEffect } from 'react';
import {Context, server} from '../main';
import Loader from '../components/Loader';
import axios from 'axios';


const Profile = () => {
  const {loading,isAuthenticated,user}= useContext(Context);
  const {setUser,setIsAuthenticated,setLoading}= useContext(Context);
  console.log(user)

  useEffect(()=>{

    setLoading(true);
    axios.get(`${server}/api/v1/users/me`, 
    { withCredentials:true,
    }).then((res)=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(true);
    })
  },[]);


  return (
    loading ? <Loader /> : (
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
    </div>
    )
  )
}

export default Profile;
