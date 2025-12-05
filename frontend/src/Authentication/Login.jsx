import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css";

const Login = ({setShowLogin}) => {
    const [currentState,setCurrentState] = useState("Sign In")
    const navigate=useNavigate()
  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div className="login-poup-title">
                <h2 className='font-extrabold text-4xl'>Sign In</h2>
                <h2 onClick={()=>setShowLogin(false)} className='close-btn  font-bold text-2xl'>X</h2>
            </div>
            <div className="login-popup-inputs">
              {currentState ==="Login"?<></>:<div onClick={()=>navigate("/registration")} ></div>}
              <input type="email" placeholder='E-mail' required autoComplete='username'/>
              <input type="password" placeholder='* * * * * * * *' required autoComplete='current-password'/>
            </div>
            <button type='submit'>Login</button>

            <div className="login-popup-condition">
              <input type="checkbox" required/>
              <p>By continuing , i agree to the terms of use & privacy policy.</p>
            </div>
        <p>Create a new account ? <span onClick={()=> navigate("/registration")}>Click here</span></p>
        </form>
    </div>
  )
}  

export default Login