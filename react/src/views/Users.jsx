import React, { useEffect, useState } from 'react'
import axiosClinet from '../axios.client.js'
import { Link } from 'react-router-dom'
import axiosClient from '../axios.client.js'
import { useStateContext } from '../contexts/ContextProvider.jsx'

const Users = () => {

  const [Users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoading(true)
    axiosClinet.get('/users').then(({ data }) => {
      setLoading(false)
      console.log(data)
      setUsers(data.data)
    }).catch(() => {
      setLoading(false)
    })
  }

  const onDelete = (u) => {
    if (!window.confirm('Are you sure!')) {
      return
    }

    axiosClient.delete (`/users/${u.id}`).then(() => {
      setNotification('user deleted!')
      getUsers
    })
  }



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link className='btn-add' to='/users/new'>Add New</Link>
        <div className='card animated fadeInDown'>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading && <tbody>
              <tr>
                <td colSpan="5" className='text-center'>Loading...</td>
              </tr>
            </tbody>}

            {!loading && <tbody>
              {Users.map(u => (
                <tr>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td><Link className='btn-edit' to={'/users/' + u.id}>Edit</Link>
                    <button onClick={ev => onDelete(u)} className='btn-delete'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users