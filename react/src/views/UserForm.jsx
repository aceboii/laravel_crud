import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from '../axios.client'
import { useStateContext } from '../contexts/ContextProvider';

const UserForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const {setNotification} = useStateContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState({id:null, name:'', email:'', password:'', password_confirmation:''})

  if(id){
    useEffect(()=>{
      setLoading(true)
      axiosClient.get(`/users/${id}`)
      .then(({data})=> {
        setLoading(false)
        setUser(data)
      }).catch(()=> {
        setLoading(false)
      })
    },[])


    const onFormSubmit = (e) => {
      e.preventDefault()
      if(user.id){
        axiosClient.put(`/users/${user.id}`,user).then(()=>{
          setNotification('User was updated')
          navigate('/users')
        }).catch(err => {
          const response = err.response;
          if(response && response.status === 422){
            setError(response.data.errors)
          }
        })
      }else{
        axiosClient.put(`/users`,user).then(()=>{
          setNotification('user was created')
          navigate('/users')
        }).catch(err => {
          const response = err.response;
          if(response && response.status === 422){
            setError(response.data.errors)
          }
        })
      }
    }

  }

  return (
    <>

    {user.id && <h1>New User</h1>}
    {!user.id && <h1>New User</h1>}
    <div className='card animated fadeInDown'>
      {loading && (
        <div className='text-center'>Loading...</div>
      )}
      {error && <div className='alert'>{Object.keys(error).map(key => (
        <p key = {key}>{error[key]}</p>
      ))}
      </div>
      }
      {!loading && 
      <form onSubmit={onFormSubmit}>
        <input onChange={ev=> setUser({...user,name:ev.target.value})} value={user.name} placeholder='Name'/>
        <input type='email' onChange={ev=> setUser({...user,email:ev.target.value})} value={user.email} placeholder='Email'/>
        <input type='password' onChange={ev=> setUser({...user,password:ev.target.value})} placeholder='Password'/>
        <input type='password' onChange={ev=> setUser({...user,password_confirmation:ev.target.value})} placeholder='Password Confirmation'/>P
        <button className='btn'>Save</button>
      </form>}
    </div>
    </>
  )
}

export default UserForm