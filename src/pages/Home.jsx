import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {
 
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [loading,setLoading]=useState(false);
  const [tasks,setTasks]=useState([]);
  const [refresh,setRefresh]=useState(false)

  const {isAuthenticated}=useContext(Context);

  const updateHandler= async(id)=>{
   try {
    const {data}=await axios.put(`${server}/api/v1/task/${id}`,
    {},
    {
      withCredentials:true
    })
    toast.success(data.message);
    setRefresh((prev)=> !prev)
   } catch (error) {
    toast.error(error.response.data.message);
   }
  }

  const deleteHandler=async(id)=>{
    try {
      const {data}=await axios.delete(`${server}/api/v1/task/${id}`,
      {
        withCredentials:true
      })
      toast.success(data.message);
      setRefresh((prev)=> !prev)
     } catch (error) {
      toast.error(error.response.data.message);
     }
  }

  const addTask= async(e)=>{
    setLoading(true);
    e.preventDefault();
    try {
      const {data} = await axios.post(`${server}/api/v1/task/info`, {
        title,description
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
       withCredentials:true,
    }
  )
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setRefresh((prev)=> !prev)
      setLoading(false);
    } catch (error) {
      toast.error(response.data.message);
      console.log(error)
      setLoading(false);
    }
   }

   useEffect(()=>{
    axios.get(`${server}/api/v1/task/myTask`,{
      withCredentials:true,
    })
    .then((res)=>{
      setTasks(res.data.tasks); 
    })
    .catch((e)=>{
      toast.error(e.response.data.message);
    });
   },[refresh]);

   if(!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div className="container">
       <div className="login">
        <section>
      
            <form method='POST'>
                <input value={title} 
                required
                onChange={(e)=>setTitle(e.target.value)}
                type="text" 
                placeholder='Title' />

                <input value={description} 
                required
                onChange={(e)=>setDescription(e.target.value)}
                type="text" 
                placeholder='Description' />

                <button disabled={loading} type='submit' onClick={addTask}>Add Task</button>
            </form>
            </section>
          </div>
      <section className="todosContainer">
      {tasks.map((i) => (
          <TodoItem title={i.title} 
          description={i.description} 
          isCompleted={i.isCompleted} 
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          id={i._id}
          key={i._id}
          />
      ))}
      </section>
    </div>
  )
}

export default Home
