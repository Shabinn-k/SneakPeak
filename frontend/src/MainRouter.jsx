import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './pages/NotFound'
import Registration from './pages/Registration.jsx'
import Footer from './components/Footer'
import Shop from './pages/shop/Shop'
import About from './pages/About.jsx'


const Cart = lazy(() => import("./pages/Cart/Cart.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist.jsx"))
const Detail = lazy(() => import("./pages/DetailsCards/Detail.jsx"))
const Payment = lazy(() => import("./pages/Payment/Payment.jsx"))

const MainRouter = () => {

  const location = useLocation();
  const hideFoot = ["/shop", "/cart", "/wishlist", "/about", "/payment", "/detail"].includes(location.pathname);
  return (
    <>
      <Suspense fallback={<div className='loader'>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/about' element={<About />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {!hideFoot && <Footer />}
      </Suspense>
    </>

  )

}

export default MainRouter 