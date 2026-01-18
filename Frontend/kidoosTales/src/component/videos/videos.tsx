import React from 'react'
import { useState } from 'react';

interface VideoProps {
  video: string;
  username: string;
  description: string;
}

const Videos = ({ video, username, description }: VideoProps) => {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="h-screen w-full  snap-y snap-mandatory bg-black/20">

        <div className="h-screen snap-start relative flex justify-center items-center bg-gradient-to-b from-blue-100 to-white p-2 w-full">

          {/* Video */}
          <video
            className="h-9/10 w-auto max-w-[430px] object-cover border border-white-300 rounded-2xl shadow-lg"
            src={video}
            autoPlay
            loop
            muted
            controls
          />

          {/* Right Action Bar */}
          <div className="absolute right-4 bottom-24 flex flex-col gap-6 text-white">

            {/* LIKE BUTTON */}
            <button
              onClick={handleLike}
              className={`
                text-3xl font-bold
                transition-all duration-300
                ${liked ? "text-pink-500" : "text-white"}
                ${animate ? "scale-125" : "scale-100"}
                active:scale-90
              `}
            >
              ❤️
            </button>

            {/* COMMENT */}
            <button className="text-3xl font-bold hover:text-blue-500 transition">
              💬
            </button>

            {/* SHARE */}
            <button className="text-3xl font-bold hover:text-green-500 transition">
              🔗
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-6 left-4 text-black max-w-[80%]">
            <p className="font-semibold text-lg bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              @{username}
            </p>

            <p className="text-sm opacity-90">
              {description}
            </p>

            <p className="text-xs opacity-70 mt-1">
              🎵 Background Music
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Videos;
