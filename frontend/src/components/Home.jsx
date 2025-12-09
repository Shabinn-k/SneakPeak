import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import Banner from './Banner'
import TopSelling from './TopSelling/TopSelling'
import Login from '../Authentication/Login'
import Feedback from './Feedback/Feedback'
import GoShop from './GoShop/GoShop'

const Home = () => {
  const [showLogin,setShowLogin] = useState(false)
  
  return (
    <>
        {showLogin ? <Login setShowLogin={setShowLogin}/>:<></>}

    <Navbar setShowLogin={setShowLogin}/>
    <Banner/>
    <TopSelling  setShowLogin={setShowLogin} />
    <GoShop/> 
    <Feedback setShowLogin={setShowLogin}/>
    </>
  )
}

export default Home