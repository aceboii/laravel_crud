import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState()
  const { setUser, SetToken } = useStateContext()

setError(null)

  const onFormSubmit = (e) => {
    e.preventDefault()

    const payLoad = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payLoad)
      .then(({ data }) => {
        setUser(data.user)
        SetToken(data.SetToken)
      }).catch(err => {
        const response = err.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setError(response.data.errors)
          }else{
            setError({email:[response.data.message]})
          }
        }
      })


  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onFormSubmit}>
          <h1 className='title'>Login to continue</h1>
          {error && <div className='alert'>
            {Object.keys(error).map(key => (
              <p key={key}>{error[key][0]}</p>
            ))}
          </div>}
          <input ref={emailRef} type='email' placeholder='Give Emial' />
          <input ref={passwordRef} type='password' placeholder='Password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not Registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login