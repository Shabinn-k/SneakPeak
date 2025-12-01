import React from 'react'
import { useFormik } from 'formik';
import { signUpValidation } from './AuthContext';
import { Link } from 'react-router-dom';


const initialValue = {
    email: "",
    password: ""
}
const Login = () => {

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValue,
        validationSchema: signUpValidation,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br /><input type="email" name='email'
                    placeholder='E-mail' required value={values.email}
                    onBlur={handleBlur} onChange={handleChange}
                /><br />
                {errors.email && <small>{errors.email}</small>}
                <br /> <input type="password" name='password' placeholder=' * * * * * * * * '
                    value={values.password} required
                    onBlur={handleBlur} onChange={handleChange}

                /><br />
                {errors.password && <small>{errors.password}</small>}
             <br />  <button>Login</button><br/>
                    <span>Dont have an accoount ? <Link to="/registration">click here</Link></span>
            </form>
        </div>
    )
}

export default Login