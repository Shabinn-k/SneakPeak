import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './Authentication/Login'
import NotFound from './pages/NotFound'
import Registration from './Authentication/Registration'
import Footer from './components/Footer'

const MainRouter = () => {

  return (
    
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>

      <Footer/>
    </>
  
)

}

export default MainRouter