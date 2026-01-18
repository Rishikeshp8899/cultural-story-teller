import React, { useState } from "react";
import Logoimage from '../../static/image/image.png';
import { Link } from "react-router-dom";
import {REGEX} from "../../constants/regex"
import apicall from "../../service/ApiCall"
import accessToken from "../../auth/AccessToken"
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // reset error
  };

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "" };

  
    if (!REGEX.EMAIL.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

   
    if (form.password.length < 6 && !REGEX.PASSWORD.test(form.email)) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;
    try {
        const response=await apicall({
             apiname:"LOGIN",
            userData:{
                email:form.email,
                password:form.password
            }
         })
         const userId = response?.data?.user_id || "";
         accessToken({login:"true", logout:"false", user_id:userId});
        navigate("/videos");

    } catch (error) {
        console.log("error",error)
    }
   
  };

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="login w-96 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="logoLogin mb-6 flex justify-center">
          <div className="title flex items-center gap-3 px-5">
            <img src={Logoimage} alt="Logo" className="h-16 w-16 rounded-full" />
            <h2 className="font-bold p-2">Kidoos Tales.ai</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
        
          <div className="form-group mb-4">
            <label htmlFor="email" className="font-bold p-1 block">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChanges}
              className={`border rounded-md p-2 w-full ${errors.email ? "border-red-500" : "border-gray-500"}`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

    
          <div className="form-group mb-4 relative">
            <label htmlFor="password" className="font-bold p-1 block">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChanges}
              className={`border rounded-md p-2 w-full ${errors.password ? "border-red-500" : "border-gray-500"}`}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-8 text-sm text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            >
              Login
            </button>
          </div>
        </form>

        <div className="register mt-4 flex justify-center">
          <h3>
            New to Kidoos Tales.ai? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
