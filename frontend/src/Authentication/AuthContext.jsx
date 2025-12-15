import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../api/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));

    setLoading(false);
  }, []);
 
  useEffect(() => {
    if (!user) return;

    const checkUserAcc = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);

        if (res.data.acc === "blocked") {
          toast.error("Your account has been blocked by admin");
          logout();
        }
      } catch (err) {
        console.log("acc check failed");
      }
    };
 
    const interval = setInterval(checkUserAcc, 5000);

    return () => clearInterval(interval);
  }, [user]);

  // LOGIN
  const login = async (email, password) => {
    try {
      // admin login
      const adminRes = await api.get("/admin", {
        params: { email, password },
      });

      if (adminRes.data.length > 0) {
        const adminData = adminRes.data[0];
        setAdmin(adminData);
        localStorage.setItem("admin", JSON.stringify(adminData));
        toast.success("Admin Login Successful!");
        navigate("/admin/dashboard");
        return true;
      }
 
      const res = await api.get("/users", { params: { email } });
      if (!res.data.length) {
        toast.error("Email not found!");
        return false;
      }

      const userData = res.data[0];

      if (userData.password !== password) {
        toast.error("Incorrect password!");
        return false;
      }
 
      if (userData.acc === "blocked") {
        toast.error("Your account is blocked!");
        return false;
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login Successful!");
      return true;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      return false;
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/");
  };

  // SIGNUP
  const signup = async (newUser) => {
    try {
      const check = await api.get("/users", {
        params: { email: newUser.email },
      });

      if (check.data.length) {
        toast.error("Email already exists!");
        return false;
      }

      // default acc
      const res = await api.post("/users", {
        ...newUser,
        acc: "active",
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Signup Successful!");
      return true;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        login,
        logout,
        signup,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
