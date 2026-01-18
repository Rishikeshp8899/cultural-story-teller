import React from 'react'
import logoButton from '../../static/image/image.png'
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="
        w-full
        bg-gradient-to-b md:bg-gradient-to-r
        from-white to-cyan-300
        rounded-2xl
        shadow-lg
        min-h-[50vh]
        flex flex-col md:flex-row
        items-center
        justify-between
        p-6 md:p-10
        mt-6
        gap-6
        mx-auto
      "
    >
      {/* LEFT CONTENT */}
      <div className="text-center md:text-left mx-20">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight">
          AI-Powered <br /> Storytelling <br /> for Kids
        </h1>

        <h3 className="mt-4 text-base md:text-lg text-blue-800">
          Create enchanting stories <br className="hidden md:block" />
          for children with the help of AI
        </h3>

        <button
          className="
           bg-blue-600
    hover:bg-blue-700
    hover:scale-105
    hover:shadow-xl
    text-white
    px-6 py-3
    rounded-full
    transition-all
    duration-300
    ease-in-out
    mt-6
          "
          onClick={()=>{
           navigate("/videos")
          }}
        >
          Get Started
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center m-1d:justify-end mr-20-lg:mr-0">
        <img
          src={logoButton}
          alt="Logo"
          className="
            h-40 w-40
            md:h-64 md:w-64
            rounded-2xl
            drop-shadow-lg
          "
        />
      </div>
    </div>
  )
}

export default Banner
