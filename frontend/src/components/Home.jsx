import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import Banner from './Banner'
import TopSelling from './TopSelling/TopSelling'
import Login from '../Authentication/Login'

const Home = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
        {showLogin ? <Login setShowLogin={setShowLogin}/>:<></>}

    <Navbar setShowLogin={setShowLogin}/>
    <Banner/>
    <TopSelling/>
    </>
  )
}

export default Home