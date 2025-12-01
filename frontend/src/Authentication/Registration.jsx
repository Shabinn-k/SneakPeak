import React from 'react'
import { useFormik } from 'formik';
import { signUpValidation } from './AuthContext';
import { useNavigate } from 'react-router-dom';


const initialValue = {
    name: "",
    number: "",
    email: "",
    password: "",
    cpass: ""
}
const Registration = () => {

    const navigate=useNavigate();


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

                <br/><input type="text" name='name'
                    placeholder='Enter Your Name' required value={values.name}
                    onBlur={handleBlur} onChange={handleChange} />
                <br/><br/>

                <input type="tel" name='number'
                    placeholder='Phone Number' required value={values.number}
                    onBlur={handleBlur} onChange={handleChange} />
                <br/><br/>

                <input type="email" name='email'
                    placeholder='E-mail' required value={values.email}
                    onBlur={handleBlur} onChange={handleChange} />
                <br/>
                {errors.email && <small>{errors.email}</small>}
                <br/>

                <input type="text" name='password' placeholder='Password'
                    value={values.password} required
                    onBlur={handleBlur} onChange={handleChange} /><br />
                {errors.password && <small>{errors.password}</small>}
                <br/>

                <input type="password" name='cpass' placeholder=' * * * * * * * * '
                    value={values.cpass} required
                    onBlur={handleBlur} onChange={handleChange} />
                <b/>
                {errors.cpass && <small>{errors.cpass}</small>}
                <br/>
                <button>create account</button>

            </form>
        </div>
    )
}

export default Registration