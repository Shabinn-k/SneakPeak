import React from 'react'
import {Routes, Route ,useLocation} from 'react-router-dom'
import Home from './components/Home'
import Login from './Authentication/Login'
import NotFound from './pages/NotFound'
import Registration from './Authentication/Registration'
import Footer from './components/Footer'
// import Shop from './pages/shop/Shop'

const MainRouter = () => {
      const location =useLocation();
      const hideFoot=["/shop"].includes(location.pathname);
  return (
    
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
      {/* <Route path='/shop' element={<Shop/>}/> */}
      <Route path='*' element={<NotFound/>}/>
    </Routes>

    {!hideFoot && <Footer/>}  
    </>
  
)

}

export default MainRouter