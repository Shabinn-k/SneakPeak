import React from 'react'
import { Suspense,lazy } from 'react'
import {Routes, Route ,useLocation} from 'react-router-dom'
import Home from './components/Home'
import Login from './Authentication/Login'
import NotFound from './pages/NotFound'
import Registration from './Authentication/Registration'
import Footer from './components/Footer'
// import Shop from './pages/shop/Shop'

const Cart=lazy(()=>import ("./pages/Cart/Cart.jsx"));
const Wishlist = lazy(()=>import("./pages/Wishlist/Wishlist.jsx"))
const MainRouter = () => {
      const location =useLocation();
      const hideFoot=["/shop","/cart","/wishlist"].includes(location.pathname);
  return (
    <>
    <Suspense fallback={<div className='loader'>Loading...</div>}>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
      {/* <Route path='/shop' element={<Shop/>}/> */}
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>

    {!hideFoot && <Footer/>}  
    </Suspense>
    </>
  
)

}

export default MainRouter