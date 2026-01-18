import React from 'react'


const Cards = () => {
  return (
    <div className="w-full border-t pt-10  border-gray-300 border mt-10 rounded-lg pb-10 shadow-lg ">
        <div className="Features">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
            Features
            </h2>
        </div>
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto rounded-lg w-full">

        {/* Card 1 */}
        <div className="
          bg-white
          rounded-2xl
          p-6
          shadow-md
          hover:shadow-xl
          hover:scale-105
          transition-all
          duration-300
          text-center
          w-1/2 mx-auto md:w-full
          border
          border-gray-200
          backdrop-blur-md
          bg-white/30
          hover:bg-white/50
          bg-radient-to-b from-white to-white

        ">
     <div className="text-4xl mb-4">🎤</div>
          <h1 className="text-xl font-bold text-blue-900">
            AI Story <br /> Generation
          </h1>
          <h3 className="mt-3 text-gray-600">
            Generate unique <br /> and engaging stories
          </h3>
        </div>

        {/* Card 2 */}
        <div className="
         bg-white
          rounded-2xl
          p-6
          shadow-md
          hover:shadow-xl
          hover:scale-105
          transition-all
          duration-300
          text-center
          w-1/2 mx-auto md:w-full
          border
          border-gray-200
          backdrop-blur-md
          bg-white/30
          hover:bg-white/50
          bg-radient-to-b from-white to-white
        ">
            <div className="text-4xl mb-4">🌍</div>
          <h1 className="text-xl font-bold text-blue-900">
            Cultural <br /> Stories
          </h1>
          <h3 className="mt-3 text-gray-600">
            Explore tales from <br /> around the world
          </h3>
        </div>

        {/* Card 3 */}
        <div className="
         bg-white
          rounded-2xl
          p-6
          shadow-md
          hover:shadow-xl
          hover:scale-105
          transition-all
          duration-300
          text-center
          w-1/2 mx-auto md:w-full
          border
          border-gray-200
          backdrop-blur-md
          bg-white/30
          hover:bg-white/50
          bg-radient-to-b from-white to-white
        ">
        <div className="text-4xl mb-4">🐾</div>
          <h1 className="text-xl font-bold text-blue-900">
            Animal & <br /> Nature Stories
          </h1>
          <h3 className="mt-3 text-gray-600">
            Discover stories <br /> featuring animals <br /> and nature
          </h3>
        </div>

      </div>
    </div>
  )
}

export default Cards
