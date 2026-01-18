import React from 'react'

const Footer = () => {
  return (
   <footer>
    <div className="w-full border-t pt-1  border-gray-300 border mt-10 bg-cyan-100/50 backdrop-blur-md  rounded-lg pb-3 mb-2 shadow-lg ">
        <p className="text-center text-gray-600 mb-4">
            &copy; {new Date().getFullYear()} Kiddoo’s Tales.ai. All rights reserved.
        </p>
        </div>
   </footer>
  )
}

export default Footer
