import * as Yup from "yup";

export const Validation = Yup.object({
    name: Yup.string().min(3),
    number: Yup.string().min(10),
    email: Yup.string().email("invalid email"),
    password: Yup.string().min(8, "min 8 characters"),
    cpass: Yup.string().oneOf([Yup.ref("password")], "Password not match")
})