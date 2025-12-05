import { ToastContainer } from 'react-toastify';
import './App.css'
import MainRouter from './MainRouter.jsx'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <MainRouter/>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
