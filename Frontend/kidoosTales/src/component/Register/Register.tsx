import React, { useState } from "react";
import Logoimage from "../../static/image/image.png";
import { REGEX } from "../../constants/regex";
import apicall from "../../service/ApiCall"
import { useNavigate } from "react-router-dom";
import accessToken from "../../auth/AccessToken"

interface FormState {
  username: string;
  email: string;
  password: string;
  repassword: string;
}

const Register = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "username":
        setErrors((prev) => ({
          ...prev,
          username: value.length < 3 ? "Username must be at least 3 characters" : "",
        }));
        break;
      case "email":
        setErrors((prev) => ({
          ...prev,
          email: REGEX.EMAIL.test(value) ? "" : "Invalid email",
        }));
        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password: REGEX.PASSWORD.test(value)
            ? ""
            : "Password must have uppercase, lowercase, number & special char",
        }));
       
        if (form.repassword && value !== form.repassword) {
          setErrors((prev) => ({
            ...prev,
            repassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, repassword: "" }));
        }
        break;
      case "repassword":
        setErrors((prev) => ({
          ...prev,
          repassword: value !== form.password ? "Passwords do not match" : "",
        }));
        break;
      default:
        break;
    }


  };

  const isFormValid = () => {
    return (
      form.username &&
      form.email &&
      form.password &&
      form.repassword &&
      Object.values(errors).every((err) => err === "")
    );
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    console.log("in handle submit")
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fix errors before submitting");
      return;
    }
        try{
        console.log("in handle submit")  
        const respose=await apicall({
            apiname:"REGISTER",
            userData:{
                username:form.username,
                email:form.email,
                password:form.password
            }
        })
        accessToken({login:"true", logout:"false" });
        navigate("/customer-form");

    }catch(error:any)
    {
console.log("error ",error)  

    }

  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="login w-96 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="logoLogin mb-6 flex justify-center">
          <div className="title flex items-center gap-3 px-5">
            <img src={Logoimage} alt="Logo" className="h-16 w-16 rounded-full" />
            <h2 className="font-bold p-2">Kidoos Tales.ai</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate>

          <div className="form-group mb-3">
            <label htmlFor="username" className="font-bold p-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChanges}
              className="border border-gray-500 rounded-md p-2 w-full"
              required
            />
            {errors.username && <h3 className="text-red-500 text-sm">{errors.username}</h3>}
          </div>

        
          <div className="form-group mb-3">
            <label htmlFor="email" className="font-bold p-1">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChanges}
              className="border border-gray-500 rounded-md p-2 w-full"
              required
            />
            {errors.email && <h3 className="text-red-500 text-sm">{errors.email}</h3>}
          </div>

     
          <div className="form-group mb-3">
            <label htmlFor="password" className="font-bold p-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChanges}
              className="border border-gray-500 rounded-md p-2 w-full"
              required
            />
            {errors.password && <h3 className="text-red-500 text-sm">{errors.password}</h3>}
          </div>

      
          <div className="form-group mb-3">
            <label htmlFor="repassword" className="font-bold p-1">
              Re-enter Password:
            </label>
            <input
              type="password"
              id="repassword"
              name="repassword"
              value={form.repassword}
              onChange={handleChanges}
              className="border border-gray-500 rounded-md p-2 w-full"
              required
            />
            {errors.repassword && <h3 className="text-red-500 text-sm">{errors.repassword}</h3>}
          </div>

          <div className="flex justify-center w-full">
            <button
              type="submit"
              disabled={!isFormValid()}
              className="bg-blue-500 text-white px-4 py-2 text-center rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

