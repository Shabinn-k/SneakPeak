import * as Yup from "yup"

export const signUpValidation=Yup.object({
    email:Yup.string().email().required("Please enter a valid E-mail"),
    password:Yup.string().min(8)

})