import { createContext, useEffect, useState,useContext } from "react";
import { api } from "../api/Axios";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"; 


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [admin,setAdmin] = useState(null)
    const navigate=useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedAdmin = localStorage.getItem("admin");

        if(storedUser) setUser(JSON.parse(storedUser))
        if(storedAdmin) setAdmin(JSON.parse(storedAdmin))
        setLoading(false)
    }, [])

    //login
    const login = async (email,password) => {
        try {
            const adminRes = await api.get("/admin",{params:{email,password}})
            if(adminRes.data.length> 0){
                const adminData =  adminRes.data[0];

                setAdmin(adminData);
                localStorage.setItem("admin",JSON.stringify(adminData))
                toast.success("Admin Login Succesfull !")
                navigate("/admin/dashboard")
                return true
            }

            const res = await api.get("/users", { params: { email } })
            if (!res.data.length) {
                toast.error("Email not found !");
                return false;
            }
            const user = res.data[0];

            if (user.password !== password) {
                toast.error("Incorrect password !");
                return false;
            }
            //login
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Login Successfull");
            return true

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong !");
            return false;
        }
    }

    //logout
    const logout = () => {
        setUser(null);
        setAdmin(null)
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        toast.info("Logged out succesfully !")
        navigate("/")
    }

    //register
    const signup = async (newUser) => {
        try {
            //if alrdy exist
            const check = await api.get("/users", { params: { email: newUser.email } });
           console.log(check);
           
            if (check.data.length) {
                toast.error("Email already exist !");
                return false
            }
            //new user
            const res = await api.post("/users", newUser);
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            toast.success("Sign Up Successfull !");
            return true
        } catch (err) {
            console.log(err);
            toast.error("Something went Wrong !");
            return false
        }
    }

    const AuthValue = {
        user,
        admin,
        setUser,
        loading,
        login,
        logout,
        signup,
    }

    return (
        <AuthContext.Provider value={AuthValue}>
            {props.children}
        </AuthContext.Provider>
    )
}