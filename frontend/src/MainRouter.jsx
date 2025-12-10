import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './pages/NotFound'
import Registration from './pages/Registration.jsx'
import Footer from './components/Footer'
import Shop from './pages/shop/Shop'
import About from './pages/About.jsx'
import AdminProtected from './Admin/AdminProtected.jsx'
import Dashboard from './Admin/Pages/Dashboard/Dashboard.jsx'


const Cart = lazy(() => import("./pages/Cart/Cart.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist/Wishlist.jsx"))
const Detail = lazy(() => import("./pages/DetailsCards/Detail.jsx"))
const Payment = lazy(() => import("./pages/Payment/Payment.jsx"))
const WriteFeed = lazy(()=>import("./pages/WriteFeed/WriteFeed.jsx"))
const Orders = lazy(()=>import("./pages/Orders/Orders.jsx"))

const MainRouter = () => {

  const location = useLocation();
  const hideFoot = ["/shop", "/cart", "/wishlist", "/about", "/payment", "/detail","/feedback","/myOrders","/404","/admin/dashboard"].includes(location.pathname);
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
          <Route path='/feedback' element={<WriteFeed/>}/>
          <Route path='/myOrders' element={<Orders/>}/>
          <Route path='/admin/dashboard' element={
            <AdminProtected>
              <Dashboard/>
            </AdminProtected>
          }/>
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to="/404" />} />
        </Routes>
        {!hideFoot && <Footer />}
      </Suspense>
    </>

  )

}

export default MainRouter 