import React from 'react'
import apiRequest from '../lib/apiRequest';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout")
      localStorage.removeItem("user")
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }

  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>

      <p> {user && user.email} </p>

    </div>
  )
}

export default App