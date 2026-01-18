import React, { useState } from "react";
import LogoImage from "../../static/image/image.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="shadow-sm sticky top-1  z-50 bg-white/70 backdrop-blur-md  mx-auto rounded-10">
      <nav className=" mx-auto p-2 flex items-center  justify-between bg-gradient-to-r from-cyan-300 to-white rounded-md shadow-md border border-gray-200 shadow-lg ">

        <div className="flex items-center gap-3 px-5">
          <img src={LogoImage} alt="Logo" className="h-16 w-16 rounded-100" />
          <h2 className="text-lg font-extrabold text-slate-900 px-2">
            Kidoo’s  Tales.ai
          </h2>
        </div>

      
        <div className="hidden md:flex items-center gap-8 font-semibold pr-8 ">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Features</a>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700" onClick={()=>{
            navigate("/videos")
          }}
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 shadow-md bg-cyan-100/50 backdrop-blur-md  rounded-lg border  rounded-b-xl border-gray-200">
          <a href="#" className="block font-semibold mt-1">Home</a>
          <a href="#" className="block font-semibold mt-1">Features</a>
      
          <button className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold mt-1 hover:bg-blue-700" onClick={()=>{
            navigate("/videos")
          
          }}>
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
