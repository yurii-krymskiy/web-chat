import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { AuthContext } from './context/AuthContext'
import HomePage from './pages/HomePage'

const App = () => {
  const authContext = useContext(AuthContext)
  const authUser = authContext?.authUser
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
