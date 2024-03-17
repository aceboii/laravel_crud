import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios.client'
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const [error, setError] = useState()
  const {setUser, SetToken} = useStateContext()


  const onFormSubmit = (e) => {
    e.preventDefault()
    const payLoad = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      passwordConfirmation:passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payLoad)
    .then(({data})=>{
      setUser(data.user)
        SetToken(data.SetToken)
    }).catch(err => {
      const response = err.response
      if (response && response.status === 422) {
        console.log(response.data.errors)
        setError(response.data.errors)
      }
    })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onFormSubmit}>
        <h1 className='title'>Registered to continue</h1>
        {error && <div className='alert'>
          {Object.keys(error).map(key=>(
            <p key={key}>{error[key][0]}</p>
          ))}
        </div>}
          <input ref={nameRef} type='text' placeholder='Full name'/>
          <input ref={emailRef} type='email' placeholder='Give Emial'/>
          <input ref={passwordRef} type='password' placeholder='Password'/>
          <input ref={passwordConfirmationRef} type='password' placeholder='Password_Confirmation'/>
          <button className='btn btn-block'>SignUp</button>
          <p className='message'>
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
    )
}

export default Signup