import React, { useEffect } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios.client';

const DefaultLayout = () => {

  const { user, token,notification, setUser, setToken} = useStateContext()

  if (!token) {
    return <Navigate to='/login' />
  }

  const onLogout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout').then(()=> {
      setToken(null),
    setUser({})
    })
  }

  useEffect(() => {
    axiosClient.get('/user').then(({data})=>{
      setUser(data)
    })
  
  }, [third])
  

  return (
    <div id='defaultLayout'>
      <aside>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/users'>Users</Link>
      </aside>
      <div className='content'>
        <header>
          <div>Header</div>
          <div>
          {user.name}
          <a href='#' onClick={onLogout} className='btn-logout'>logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      {notification && <div className='notification'>
        {notification}
      </div>}
    </div>
  );
};

export default DefaultLayout;
