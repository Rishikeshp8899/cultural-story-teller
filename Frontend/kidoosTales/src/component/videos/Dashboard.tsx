// // // // // import React, { useState } from 'react'
// // // // // import Videos from './videos'
// // // // // import CommentForm from '../Comment/CommentForm'
// // // // // import videoSample from './Darling  Srividya Kotnala x Hearing India - Hearing India (1080p, h264).mp4'
// // // // // import videoSample2 from './White man makes better Indian Food than I do - Sanaea Bubber (720p, h264).mp4'

// // // // // const Dashboard = () => {
// // // // //   const [showComment, setShowComment] = useState(false)

// // // // //   return (
// // // // //     <div className="relative w-full min-h-screen">
// // // // //         {
// // // // //         !showComment &&(
// // // // //       <div className="fixed top-3 left-3 z-50">
// // // // //         <button
// // // // //           onClick={() => setShowComment(true)}
// // // // //           className="bg-white text-black w-9 h-9 rounded-full text-xl font-bold shadow"
// // // // //         >
// // // // //           +
// // // // //         </button>
// // // // //         </div>
// // // // //         )}
      

// // // // //       {
// // // // //   showComment && (
// // // // //     <div
// // // // //       className={`
// // // // //         fixed z-40 bg-white

// // // // //         transition-transform
// // // // //         duration-[1000]
// // // // //         ease-[cubic-bezier(0.22,1,0.36,1)]

// // // // //         /* Mobile (slide from top) */
// // // // //         sm:top-0 sm:left-0 sm:w-full sm:h-[60vh]
// // // // //         sm:${showComment ? 'translate-y-0' : '-translate-y-full'}

// // // // //         /* Desktop (slide from left) */
// // // // //         md:top-0 md:left-0 md:h-full md:w-[380px]
// // // // //         md:translate-y-0
// // // // //         md:${showComment ? 'translate-x-0' : '-translate-x-full'}
// // // // //       `}
// // // // //     >
// // // // //       <CommentForm onClose={() => setShowComment(false)} />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // //       <div className="snap-y flex flex-col align-center  snap-mandatory h-screen overflow-y-scroll">
// // // // //         <div className="snap-start h-screen">
// // // // //           <Videos
// // // // //             video={videoSample}
// // // // //             username="mychannel"
// // // // //             description="AI-generated kids story in Indian style 🇮🇳✨"
// // // // //           />
// // // // //         </div>

// // // // //         <div className="snap-start h-screen">
// // // // //           <Videos
// // // // //             video={videoSample2}
// // // // //             username="mychannel2"
// // // // //             description="AI-generated kids story in Indian style 2 🇮🇳✨"
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default Dashboard

// // // // import React, { useState, useEffect } from 'react'
// // // // import Videos from './videos'
// // // // import CommentForm from '../Comment/CommentForm'
// // // // import apicall from "../../service/ApiCall"

// // // // interface VideoData {
// // // //   video: string;
// // // //   username: string;
// // // //   description: string;
// // // // }

// // // // const Dashboard = () => {
// // // //   const [showComment, setShowComment] = useState(false)
// // // //   const [video, setVideo] = useState<VideoData | null>(null)
// // // //   const [loading, setLoading] = useState(true)

// // // //   const fetchVideo = async () => {
// // // //     try {
// // // //       setLoading(true)
// // // //       const response = await apicall({ apiname: "RECOMMEND_VIDEOS",
// // // //         userData: {"user_id": sessionStorage.getItem("user_id")}})

// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP error! status: ${response.status}`)
// // // //       }

// // // //       const data = await response.json()
// // // //       setVideo(data.video) // API returns single video object
// // // //     } catch (error) {
// // // //       console.error('Failed to fetch video:', error)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     fetchVideo()
// // // //   }, [])

// // // //   // Callback when video ends
// // // //   const handleVideoEnd = () => {
// // // //     fetchVideo() // get next video
// // // //   }

// // // //   return (
// // // //     <div className="relative w-full min-h-screen">
// // // //       {!showComment && (
// // // //         <div className="fixed top-3 left-3 z-50">
// // // //           <button
// // // //             onClick={() => setShowComment(true)}
// // // //             className="bg-white text-black w-9 h-9 rounded-full text-xl font-bold shadow"
// // // //           >
// // // //             +
// // // //           </button>
// // // //         </div>
// // // //       )}

// // // //       {showComment && (
// // // //         <div
// // // //           className={`
// // // //             fixed z-40 bg-white
// // // //             transition-transform duration-[1000] ease-[cubic-bezier(0.22,1,0.36,1)]
// // // //             sm:top-0 sm:left-0 sm:w-full sm:h-[60vh]
// // // //             sm:translate-y-0
// // // //             md:top-0 md:left-0 md:h-full md:w-[380px]
// // // //             md:translate-x-0
// // // //           `}
// // // //         >
// // // //           <CommentForm onClose={() => setShowComment(false)} />
// // // //         </div>
// // // //       )}

// // // //       <div className="snap-y flex flex-col align-center snap-mandatory h-screen overflow-y-scroll">
// // // //         {loading && <div className="flex justify-center items-center h-screen">Loading video...</div>}

// // // //         {video && (
// // // //           <div className="snap-start h-screen">
// // // //             <Videos
// // // //               video={video.video}
// // // //               username={video.username}
// // // //               description={video.description}
// // // //             />
// // // //             {/* Listen for video end to fetch next one */}
// // // //             <video
// // // //               src={video.video}
// // // //               onEnded={handleVideoEnd}
// // // //               className="hidden"
// // // //             />
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default Dashboard
// // // import React, { useState, useEffect } from 'react'
// // // import { useNavigate } from 'react-router-dom'
// // // import Videos from './videos'
// // // import CommentForm from '../Comment/CommentForm'
// // // import apicall from "../../service/ApiCall"

// // // interface VideoData {
// // //   video: string;
// // //   username: string;
// // //   description: string;
// // // }
// // // const Dashboard = () => {
// // //   const navigate = useNavigate()
// // //   const [showComment, setShowComment] = useState(false)
// // //   const [videoHistory, setVideoHistory] = useState<VideoData[]>([])
// // //   const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null)
// // //   const [loading, setLoading] = useState(false)

// // //   const fetchVideo = async () => {
// // //     try {
// // //       setLoading(true)
// // //       const response = await apicall({ 
// // //         apiname: "RECOMMEND_VIDEOS",
// // //         userData: {"user_id": sessionStorage.getItem("user_id")}
// // //       })

// // //       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

// // //       const data = await response.json()
// // //       const newVideo: VideoData = data.video

// // //       // Save last 5 videos
// // //       setVideoHistory(prev => [newVideo, ...prev].slice(0, 5))
// // //       setCurrentVideo(newVideo)
// // //     } catch (error) {
// // //       console.error('Failed to fetch video:', error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     fetchVideo() // fetch first video on mount
// // //   }, [])

// // //   // Callback when video ends
// // //   const handleVideoEnd = () => {
// // //     fetchVideo() // fetch next video automatically
// // //   }

// // //   return (
// // //     <div className="relative w-full min-h-screen">
// // //       {!showComment && (
// // //         <div className="fixed top-3 left-3 z-50 flex gap-2">
// // // <button
// // //   onClick={() => navigate("/customer-form")}
// // //   className="
// // //     bg-gradient-to-r from-purple-500 to-pink-500 
// // //     text-white font-semibold 
// // //     px-4 py-2 rounded-full shadow-lg 
// // //     transform transition-transform duration-200
// // //     hover:scale-105 hover:shadow-xl 
// // //     active:scale-95 active:shadow-md
// // //     ring-2 ring-purple-300
// // //   "
// // // >
// // //   Parent Custom
// // // </button>
// // //         </div>
// // //       )}

// // //       {showComment && (
// // //         <div
// // //           className={`
// // //             fixed z-40 bg-white
// // //             transition-transform duration-[1000] ease-[cubic-bezier(0.22,1,0.36,1)]
// // //             sm:top-0 sm:left-0 sm:w-full sm:h-[60vh]
// // //             sm:translate-y-0
// // //             md:top-0 md:left-0 md:h-full md:w-[380px]
// // //             md:translate-x-0
// // //           `}
// // //         >
// // //           <CommentForm onClose={() => setShowComment(false)} />
// // //         </div>
// // //       )}

// // //       <div className="snap-y flex flex-col align-center snap-mandatory h-screen overflow-y-scroll">
// // //         {loading && <div className="flex justify-center items-center h-screen">Loading video...</div>}

// // //         {currentVideo && (
// // //           <div className="snap-start h-screen">
// // //             <Videos
// // //               video={currentVideo.video}
// // //               username={currentVideo.username}
// // //               description={currentVideo.description}
// // //             />
// // //             {/* Hidden video element to track end */}
// // //             <video
// // //               src={currentVideo.video}
// // //               onEnded={handleVideoEnd}
// // //               className="hidden"
// // //             />
// // //           </div>
// // //         )}

// // //         {/* Display last 5 videos */}
// // //         {videoHistory.length > 0 && (
// // //           <div className="p-4">
// // //             <h3 className="font-bold mb-2">Last 5 Videos:</h3>
// // //             <ul className="space-y-2">
// // //               {videoHistory.map((vid, idx) => (
// // //                 <li key={idx} className="text-sm">
// // //                   {vid.username}: {vid.description}
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default Dashboard
// // // import React from 'react';
// // // import { Play, SkipForward, Mic, MessageCircle, Settings } from 'lucide-react';
// // // import Logoimage from '../../static/image/bubu-dudu-sseeyall.gif';

// // // const StoryTimeBlueTheme: React.FC = () => {
// // //   return (
// // //     <div className="min-h-screen w-full bg-gradient-to-b from-[#B3E5FC] via-[#E1F5FE] to-white flex flex-col items-center p-6 font-sans text-blue-900">
      
// // //       {/* Top Header / Parent Preference */}
// // //       <div className="w-full max-w-md flex justify-end mb-2">
// // //         <button className="flex items-center gap-2 bg-white/50 hover:bg-white/80 text-blue-600 font-bold py-2 px-4 rounded-full border border-blue-200 shadow-sm transition-all active:scale-95 text-sm">
// // //           <Settings size={16} /> Parent Preference
// // //         </button>
// // //       </div>

// // //       {/* Title Section */}
// // //       <header className="text-center mb-4">
// // //         <div className="flex items-center justify-center gap-2 mb-1">
// // //           <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
// // //             <MessageCircle className="text-white w-6 h-6" />
// // //           </div>
// // //           <h1 className="text-4xl font-black text-blue-700 drop-shadow-[0_2px_1px_rgba(255,255,255,1)] tracking-tight">
// // //             Story Time
// // //           </h1>
// // //         </div>
// // //         <h2 className="text-3xl font-black text-blue-500 drop-shadow-[0_2px_1px_rgba(255,255,255,1)]">
// // //           with Character
// // //         </h2>
// // //       </header>

// // //       {/* Main Character & Waveform Area */}
// // //       <div className="relative w-full max-w-sm flex flex-col items-center justify-center py-6">
// // //         {/* Blue Audio Wave */}
// // //         <div className="absolute flex items-center gap-1 opacity-40">
// // //           {[30, 50, 20, 70, 40, 80, 30, 60, 20].map((h, i) => (
// // //             <div key={i} className="w-1 bg-blue-400 rounded-full" style={{ height: `${h}px` }} />
// // //           ))}
// // //         </div>
        
// // //         {/* Character Image Placeholder */}
// // //         <div className="relative z-10 w-44 h-44 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-50">
// // //            <img 
// // //             src={Logoimage}
// // //             alt="Character" 
// // //             className="w-full h-full object-cover"
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Primary Controls (Shades of Blue) */}
// // //       <div className="w-full max-w-sm flex flex-col gap-4 mb-8">
// // //         <div className="flex gap-3">
// // //           <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-full shadow-lg border-b-4 border-blue-900 flex items-center justify-center gap-2 transition-transform active:scale-95">
// // //             <Play fill="currentColor" size={20} /> Play / Pause
// // //           </button>
// // //           <button className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-lg border-b-4 border-blue-700 flex items-center justify-center gap-2 transition-transform active:scale-95">
// // //             <SkipForward fill="currentColor" size={20} /> Next Story
// // //           </button>
// // //         </div>

// // //         <button className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-full shadow-lg border-b-4 border-blue-700 flex items-center justify-center gap-3 transition-transform active:scale-95">
// // //           <Mic size={24} /> Speak to Character
// // //         </button>
// // //       </div>

// // //       {/* Conversation Box (Glass White/Blue) */}
// // //       <div className="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-[2.5rem] border-4 border-white p-6 shadow-2xl">
// // //         <div className="flex flex-col gap-4">
// // //           <div className="flex justify-center -mt-9 mb-2">
// // //              <span className="bg-blue-500 px-4 py-1 rounded-full text-xs font-bold text-white shadow-md border border-white">
// // //                ◆ Conversation ◆
// // //              </span>
// // //           </div>

// // //           {/* User Message (Sky Blue) */}
// // //           <div className="flex justify-end">
// // //             <div className="bg-sky-100 text-blue-800 px-4 py-2 rounded-2xl rounded-tr-none shadow-sm border border-blue-200 max-w-[80%] relative">
// // //               <p className="font-bold text-sm">Hi! I love adventures!</p>
// // //               <span className="absolute -bottom-5 right-0 text-[10px] font-bold text-blue-400 uppercase">You</span>
// // //             </div>
// // //           </div>

// // //           {/* Character Message (Deep Blue) */}
// // //           <div className="flex items-start gap-3">
// // //             <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden flex-shrink-0 bg-blue-100">
// // //               <img src="/api/placeholder/40/40" alt="Avatar" />
// // //             </div>
// // //             <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tl-none shadow-md max-w-[80%]">
// // //               <p className="font-bold text-sm">The ocean is full of mysteries!</p>
// // //             </div>
// // //           </div>

// // //           {/* Last 5 Stories Sub-panel (Clean White) */}
// // //           <div className="mt-4 bg-white/90 rounded-3xl p-4 border border-blue-50 shadow-inner">
// // //              <div className="flex justify-center -mt-7 mb-2">
// // //                 <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold text-blue-300 shadow-sm border border-blue-50">
// // //                   ◆ Recent Adventures ◆
// // //                 </span>
// // //              </div>
// // //              <ul className="space-y-1 text-sm font-bold text-blue-800/70">
// // //                 <li className="flex items-center gap-2">
// // //                     <span className="w-4 h-4 rounded-full bg-blue-100 text-[10px] flex items-center justify-center text-blue-500">1</span> 
// // //                     The Deep Sea Treasure
// // //                 </li>
// // //                 <li className="flex items-center gap-2">
// // //                     <span className="w-4 h-4 rounded-full bg-blue-100 text-[10px] flex items-center justify-center text-blue-500">2</span> 
// // //                     The Whale's Song
// // //                 </li>
// // //                 <li className="flex items-center gap-2">
// // //                     <span className="w-4 h-4 rounded-full bg-blue-100 text-[10px] flex items-center justify-center text-blue-500">3</span> 
// // //                     The Ice Castle
// // //                 </li>
// // //              </ul>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default StoryTimeBlueTheme;

// // import React, { useState, useRef, useEffect } from 'react';
// // import { Play, Pause, SkipForward, Mic, Send, MessageCircle, Settings, MicOff } from 'lucide-react';
// // import Logoimage from '../../static/image/bubu-dudu-sseeyall.gif';
// // import apicall from "../../service/ApiCall";

// // const StoryTimeBlueTheme: React.FC = () => {
// //   // --- States ---
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [inputText, setInputText] = useState('');
// //   const [messages, setMessages] = useState([
// //     { role: 'character', text: 'The ocean is full of mysteries! What shall we explore?' }
// //   ]);
// //   const [recentStories, setRecentStories] = useState<string[]>(["The Deep Sea Treasure", "The Whale's Song"]);
// //   const [audioUrl, setAudioUrl] = useState<string | null>(null);

// //   // --- Refs ---
// //   const audioRef = useRef<HTMLAudioElement | null>(null);
// //   const recognitionRef = useRef<any>(null);

// //   // --- Speech Recognition Setup ---
// //   useEffect(() => {
// //     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// //     if (SpeechRecognition) {
// //       recognitionRef.current = new SpeechRecognition();
// //       recognitionRef.current.continuous = false;
// //       recognitionRef.current.lang = 'en-US';

// //       recognitionRef.current.onresult = (event: any) => {
// //         const transcript = event.results[0][0].transcript;
// //         setInputText(transcript);
// //         handleSendMessage(transcript); // Automatically send after speaking
// //         setIsRecording(false);
// //       };

// //       recognitionRef.current.onerror = () => setIsRecording(false);
// //     }
// //   }, []);

// //   // --- Handlers ---

// //   const handlePlayPause = () => {
// //     if (!audioRef.current) return;
// //     if (isPlaying) {
// //       audioRef.current.pause();
// //     } else {
// //       audioRef.current.play();
// //     }
// //     setIsPlaying(!isPlaying);
// //   };

// //   const fetchNextStory = async () => {
// //     try {
// //       // Reusing your apicall logic
// //       const response = await apicall({ 
// //         apiname: "RECOMMEND_VIDEOS", // Update this to your audio/story endpoint
// //         userData: { "user_id": sessionStorage.getItem("user_id") }
// //       });
// //       const data = await response.json();
      
// //       // Update UI with new data
// //       setAudioUrl(data.audio_url || ''); 
// //       setRecentStories(prev => [data.title || "New Adventure", ...prev].slice(0, 5));
// //       setMessages([{ role: 'character', text: `Let's listen to: ${data.title}` }]);
// //     } catch (error) {
// //       console.error("Failed to fetch next story", error);
// //     }
// //   };

// //   const handleSendMessage = async (textOverride?: string) => {
// //     const textToSend = textOverride || inputText;
// //     if (!textToSend.trim()) return;

// //     // Add user message to UI
// //     setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
// //     setInputText('');

// //     try {
// //       const response = await apicall({
// //         apiname: "CHAT_WITH_CHARACTER", // Your specific chat endpoint
// //         userData: { message: textToSend, user_id: sessionStorage.getItem("user_id") }
// //       });
// //       const data = await response.json();
      
// //       setMessages(prev => [...prev, { role: 'character', text: data.reply }]);
// //       if (data.audio_url) setAudioUrl(data.audio_url);
// //     } catch (error) {
// //       console.error("Chat error", error);
// //     }
// //   };

// //   const toggleRecording = () => {
// //     if (isRecording) {
// //       recognitionRef.current?.stop();
// //       setIsRecording(false);
// //     } else {
// //       recognitionRef.current?.start();
// //       setIsRecording(true);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen w-full bg-gradient-to-b from-[#B3E5FC] via-[#E1F5FE] to-white flex flex-col items-center p-6 font-sans text-blue-900">
      
// //       {/* Hidden Audio Element */}
// //       <audio 
// //         ref={audioRef} 
// //         src={audioUrl || ''} 
// //         onEnded={() => setIsPlaying(false)} 
// //         onPlay={() => setIsPlaying(true)}
// //         onPause={() => setIsPlaying(false)}
// //       />

// //       {/* Top Header */}
// //       <div className="w-full max-w-md flex justify-end mb-2">
// //         <button className="flex items-center gap-2 bg-white/50 hover:bg-white/80 text-blue-600 font-bold py-2 px-4 rounded-full border border-blue-200 shadow-sm transition-all active:scale-95 text-sm">
// //           <Settings size={16} /> Parent Preference
// //         </button>
// //       </div>

// //       <header className="text-center mb-4">
// //         <div className="flex items-center justify-center gap-2 mb-1">
// //           <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
// //             <MessageCircle className="text-white w-6 h-6" />
// //           </div>
// //           <h1 className="text-4xl font-black text-blue-700 drop-shadow-[0_2px_1px_rgba(255,255,255,1)] tracking-tight">Story Time</h1>
// //         </div>
// //       </header>

// //       {/* Character Area */}
// //       <div className="relative w-full max-w-sm flex flex-col items-center justify-center py-6">
// //         <div className={`absolute flex items-center gap-1 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-20'}`}>
// //           {[30, 50, 20, 70, 40, 80, 30, 60, 20].map((h, i) => (
// //             <div 
// //                 key={i} 
// //                 className={`w-1 bg-blue-400 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} 
// //                 style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }} 
// //             />
// //           ))}
// //         </div>
        
// //         <div className="relative z-10 w-44 h-44 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-50">
// //            <img src={Logoimage} alt="Character" className="w-full h-full object-cover" />
// //         </div>
// //       </div>

// //       {/* Primary Controls */}
// //       <div className="w-full max-w-sm flex flex-col gap-4 mb-8">
// //         <div className="flex gap-3">
// //           <button 
// //             onClick={handlePlayPause}
// //             className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-full shadow-lg border-b-4 border-blue-900 flex items-center justify-center gap-2 transition-transform active:scale-95"
// //           >
// //             {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
// //             {isPlaying ? 'Pause' : 'Play Story'}
// //           </button>
// //           <button 
// //             onClick={fetchNextStory}
// //             className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-lg border-b-4 border-blue-700 flex items-center justify-center gap-2 transition-transform active:scale-95"
// //           >
// //             <SkipForward fill="currentColor" size={20} /> Next
// //           </button>
// //         </div>

// //         <button 
// //           onClick={toggleRecording}
// //           className={`w-full bg-gradient-to-r ${isRecording ? 'from-red-400 to-red-600' : 'from-blue-400 to-cyan-500'} text-white font-bold py-4 px-6 rounded-full shadow-lg border-b-4 border-blue-700 flex items-center justify-center gap-3 transition-transform active:scale-95`}
// //         >
// //           {isRecording ? <MicOff size={24} className="animate-bounce" /> : <Mic size={24} />}
// //           {isRecording ? 'Listening...' : 'Speak to Character'}
// //         </button>
// //       </div>

// //       {/* Conversation Box */}
// //       <div className="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-[2.5rem] border-4 border-white p-6 shadow-2xl">
// //         <div className="flex flex-col gap-4">
// //           <div className="flex justify-center -mt-9 mb-2">
// //              <span className="bg-blue-500 px-4 py-1 rounded-full text-xs font-bold text-white shadow-md border border-white">
// //                ◆ Chat & History ◆
// //              </span>
// //           </div>

// //           {/* Messages Display (Scrollable) */}
// //           <div className="max-h-40 overflow-y-auto space-y-3 mb-2 px-2">
// //             {messages.map((msg, idx) => (
// //               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
// //                 <div className={`px-4 py-2 rounded-2xl shadow-sm max-w-[85%] text-sm font-bold ${
// //                   msg.role === 'user' ? 'bg-sky-100 text-blue-800 rounded-tr-none' : 'bg-blue-600 text-white rounded-tl-none'
// //                 }`}>
// //                   {msg.text}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Input Box */}
// //           <div className="relative flex items-center gap-2">
// //             <input 
// //               type="text"
// //               value={inputText}
// //               onChange={(e) => setInputText(e.target.value)}
// //               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
// //               placeholder="Type a message..."
// //               className="w-full px-5 py-3 rounded-full border-2 border-blue-200 focus:outline-none focus:border-blue-400 text-sm font-medium pr-12"
// //             />
// //             <button 
// //               onClick={() => handleSendMessage()}
// //               className="absolute right-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
// //             >
// //               <Send size={18} />
// //             </button>
// //           </div>

// //           {/* Recent Adventures */}
// //           <div className="mt-2 bg-white/90 rounded-2xl p-4 border border-blue-50 shadow-inner">
// //              <h4 className="text-[10px] font-black text-blue-300 uppercase tracking-widest text-center mb-2">Recent Adventures</h4>
// //              <ul className="space-y-1 text-sm font-bold text-blue-800/70">
// //                 {recentStories.map((story, i) => (
// //                   <li key={i} className="flex items-center gap-2">
// //                     <span className="w-4 h-4 rounded-full bg-blue-100 text-[10px] flex items-center justify-center text-blue-500">{i+1}</span> 
// //                     {story}
// //                   </li>
// //                 ))}
// //              </ul>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StoryTimeBlueTheme;

// import React, { useState, useRef, useEffect } from 'react';
// import { Play, Pause, SkipForward, Mic, Send, MessageCircle, Settings, MicOff } from 'lucide-react';
// import Logoimage from '../../static/image/bubu-dudu-sseeyall.gif';
// import apicall from "../../service/ApiCall";

// const StoryTimeBlueTheme: React.FC = () => {
//   // --- States ---
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([
//     { role: 'character', text: 'Hi there! I am ready for a new adventure. What should we talk about?' }
//   ]);
//   const [recentStories, setRecentStories] = useState<string[]>([]);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // --- Refs ---
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const recognitionRef = useRef<any>(null);
//   const userId = sessionStorage.getItem("user_id") || "a93457b7-d771-4c00-bd13-5b9da45f3f22"; // Fallback for testing

//   // --- Initial Load ---
//   useEffect(() => {
//     fetchRecommendedStory(); // Component load hote hi pehli story fetch karein
//   }, []);

//   // --- Speech Recognition Setup ---
//   useEffect(() => {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.lang = 'en-US';

//       recognitionRef.current.onresult = (event: any) => {
//         const transcript = event.results[0][0].transcript;
//         setInputText(transcript);
//         handleSendMessage(transcript); 
//         setIsRecording(false);
//       };

//       recognitionRef.current.onerror = () => setIsRecording(false);
//     }
//   }, []);

//   // --- API Handlers ---

//   // 1. RECOMMEND_AUDIO API (For Next Button)
//   const fetchRecommendedStory = async () => {
//     try {
//       setLoading(true);
//       const response = await apicall({ 
//         apiname: "RECOMMEND_AUDIO", // Endpoint: localhost:8000/api/recommend/audio
//         userData: { "user_id": userId }
//       });
//       const data = await response.json();
      
//       if (data.path) {
//         // Django media path typically needs base URL, assuming audio_url or path is full or handled by proxy
//         const fullAudioPath = data.path.startsWith('http') ? data.path : `http://localhost:8000${data.path}`;
//         setAudioUrl(fullAudioPath);
//         setRecentStories(prev => [data.title || "New Story", ...prev].slice(0, 5));
//         setMessages(prev => [...prev, { role: 'character', text: `I found a story for you: ${data.title}!` }]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch recommended story", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 2. NEXT_STORY API (For Speak/Chat)
//   const handleSendMessage = async (textOverride?: string) => {
//     const textToSend = textOverride || inputText;
//     if (!textToSend.trim()) return;

//     // Add user message to UI
//     setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
//     setInputText('');

//     try {
//       setLoading(true);
//       const response = await apicall({
//         apiname: "NEXT_STORY", // Endpoint: localhost:8000/api/next/story/
//         userData: { 
//             "user_id": userId,
//             "story_text": textToSend 
//         }
//       });
//       const data = await response.json();
      
//       setMessages(prev => [...prev, { role: 'character', text: data.description || "That's interesting!" }]);
      
//       if (data.path) {
//         const fullAudioPath = data.path.startsWith('http') ? data.path : `http://localhost:8000${data.path}`;
//         setAudioUrl(fullAudioPath);
//         // Play automatically when character responds with a new story
//         setIsPlaying(true);
//       }
//     } catch (error) {
//       console.error("Chat error", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlayPause = () => {
//     if (!audioRef.current || !audioUrl) return;
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const toggleRecording = () => {
//     if (isRecording) {
//       recognitionRef.current?.stop();
//     } else {
//       recognitionRef.current?.start();
//       setIsRecording(true);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-b from-[#B3E5FC] via-[#E1F5FE] to-white flex flex-col items-center p-6 font-sans text-blue-900">
      
//       {/* Audio Element */}
//       <audio 
//         ref={audioRef} 
//         src={audioUrl || ''} 
//         onEnded={() => setIsPlaying(false)} 
//         onPlay={() => setIsPlaying(true)}
//         onPause={() => setIsPlaying(false)}
//         autoPlay={isPlaying}
//       />

//       <div className="w-full max-w-md flex justify-end mb-2">
//         <button className="flex items-center gap-2 bg-white/50 hover:bg-white/80 text-blue-600 font-bold py-2 px-4 rounded-full border border-blue-200 shadow-sm transition-all active:scale-95 text-sm">
//           <Settings size={16} /> Parent Preference
//         </button>
//       </div>

//       <header className="text-center mb-4">
//         <div className="flex items-center justify-center gap-2 mb-1">
//           <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
//             <MessageCircle className="text-white w-6 h-6" />
//           </div>
//           <h1 className="text-4xl font-black text-blue-700 drop-shadow-[0_2px_1px_rgba(255,255,255,1)] tracking-tight">Story Time</h1>
//         </div>
//       </header>

//       {/* Character Area */}
//       <div className="relative w-full max-sm flex flex-col items-center justify-center py-6">
//         <div className={`absolute flex items-center gap-1 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-20'}`}>
//           {[30, 50, 20, 70, 40, 80, 30, 60, 20].map((h, i) => (
//             <div 
//                 key={i} 
//                 className={`w-1 bg-blue-400 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} 
//                 style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }} 
//             />
//           ))}
//         </div>
        
//         <div className="relative z-10 w-44 h-44 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-50">
//            <img src={Logoimage} alt="Character" className="w-full h-full object-cover" />
//         </div>
//       </div>

//       {/* Primary Controls */}
//       <div className="w-full max-w-sm flex flex-col gap-4 mb-8">
//         <div className="flex gap-3">
//           <button 
//             onClick={handlePlayPause}
//             disabled={!audioUrl}
//             className={`flex-1 ${!audioUrl ? 'opacity-50' : ''} bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg border-b-4 border-blue-900 flex items-center justify-center gap-2 transition-transform active:scale-95`}
//           >
//             {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
//             {isPlaying ? 'Pause' : 'Play Story'}
//           </button>
//           <button 
//             onClick={fetchRecommendedStory}
//             className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-lg border-b-4 border-blue-700 flex items-center justify-center gap-2 transition-transform active:scale-95"
//           >
//             <SkipForward fill="currentColor" size={20} /> Next
//           </button>
//         </div>

//         <button 
//           onClick={toggleRecording}
//           className={`w-full bg-gradient-to-r ${isRecording ? 'from-red-400 to-red-600' : 'from-blue-400 to-cyan-500'} text-white font-bold py-4 px-6 rounded-full shadow-lg border-b-4 border-blue-700 flex items-center justify-center gap-3 transition-transform active:scale-95`}
//         >
//           {isRecording ? <MicOff size={24} className="animate-bounce" /> : <Mic size={24} />}
//           {isRecording ? 'Listening...' : 'Speak to Character'}
//         </button>
//       </div>

//       {/* Conversation Box */}
//       <div className="w-full max-w-md bg-white/60 backdrop-blur-lg rounded-[2.5rem] border-4 border-white p-6 shadow-2xl">
//         <div className="flex flex-col gap-4">
//           <div className="flex justify-center -mt-9 mb-2">
//              <span className="bg-blue-500 px-4 py-1 rounded-full text-xs font-bold text-white shadow-md border border-white">
//                ◆ Conversation ◆
//              </span>
//           </div>

//           {/* Messages Display */}
//           <div className="max-h-40 overflow-y-auto space-y-3 mb-2 px-2 scrollbar-hide">
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`px-4 py-2 rounded-2xl shadow-sm max-w-[85%] text-sm font-bold ${
//                   msg.role === 'user' ? 'bg-sky-100 text-blue-800 rounded-tr-none' : 'bg-blue-600 text-white rounded-tl-none'
//                 }`}>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {loading && <div className="text-blue-400 text-[10px] animate-pulse">Character is thinking...</div>}
//           </div>

//           {/* Input Box */}
//           <div className="relative flex items-center gap-2">
//             <input 
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//               placeholder="Ask for a story..."
//               className="w-full px-5 py-3 rounded-full border-2 border-blue-200 focus:outline-none focus:border-blue-400 text-sm font-medium pr-12"
//             />
//             <button 
//               onClick={() => handleSendMessage()}
//               className="absolute right-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//             >
//               <Send size={18} />
//             </button>
//           </div>

//           {/* Recent Adventures */}
//           <div className="mt-2 bg-white/90 rounded-2xl p-4 border border-blue-50 shadow-inner">
//              <h4 className="text-[10px] font-black text-blue-300 uppercase tracking-widest text-center mb-2">Recent Adventures</h4>
//              <ul className="space-y-1 text-sm font-bold text-blue-800/70">
//                 {recentStories.length > 0 ? recentStories.map((story, i) => (
//                   <li key={i} className="flex items-center gap-2">
//                     <span className="w-4 h-4 rounded-full bg-blue-100 text-[10px] flex items-center justify-center text-blue-500">{i+1}</span> 
//                     {story}
//                   </li>
//                 )) : <li className="text-center text-[10px]">No stories yet</li>}
//              </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryTimeBlueTheme;

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Mic, Send, MessageCircle, Settings, MicOff } from 'lucide-react';
import Logoimage from '../../static/image/bubu-dudu-sseeyall.gif';
import apicall from "../../service/ApiCall";
import { useNavigate } from 'react-router-dom';

const StoryTimeBlueTheme: React.FC = () => {
  // --- States ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { role: 'character', text: 'Hi! I am ready for a new adventure. What should we talk about?' }
  ]);
  const [recentStories, setRecentStories] = useState<string[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const navigator = useNavigate();
  // --- Refs ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const userId = sessionStorage.getItem("user_id") || "a93457b7-d771-4c00-bd13-5b9da45f3f22";

  // --- Functions ---

  // 1. Next Button Logic
  const fetchRecommendedStory = async () => {
    try {
      setLoading(true);
      const response: any = await apicall({ 
        apiname: "RECOMMEND_AUDIO",
        userData: { "user_id": userId }
      });
      
      // Axios response logic
      const data = response.data;
      
      if (data && data.path) {
        // Path fix for Django
        const cleanPath = data.path.startsWith('/') ? data.path : `/${data.path}`;
        const fullPath = `http://localhost:8000${cleanPath}`;
        
        setAudioUrl(fullPath);
        setRecentStories(prev => [data.title || "New Story", ...prev].slice(0, 5));
        setMessages(prev => [...prev, { role: 'character', text: `Playing: ${data.title}` }]);
        
        // Audio auto-play after source change
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Next Story Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Chat / Speak Logic
  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInputText('');

    try {
      setLoading(true);
      const response: any = await apicall({
        apiname: "NEXT_STORY",
        userData: { "user_id": userId, "story_text": textToSend }
      });
      
      const data = response.data;
      setMessages(prev => [...prev, { role: 'character', text: data.description || "Got it!" }]);
      
      if (data.path) {
        const cleanPath = data.path.startsWith('/') ? data.path : `/${data.path}`;
        setAudioUrl(`http://localhost:8000${cleanPath}`);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Audio Control
  const handlePlayPause = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  // --- Effects ---

  // Auto-load audio when URL changes
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked or failed", e));
      }
    }
  }, [audioUrl]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.onresult = (e: any) => handleSendMessage(e.results[0][0].transcript);
      recognitionRef.current.onend = () => setIsRecording(false);
    }
    fetchRecommendedStory(); // Initial load
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#B3E5FC] via-[#E1F5FE] to-white flex flex-col items-center p-6 font-sans text-blue-900">
      
      {/* HTML5 Audio Element */}
      <audio 
        ref={audioRef} 
        src={audioUrl || ''} 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="w-full max-w-md flex justify-end mb-2">
        <button className="flex items-center gap-2 bg-white/50 text-blue-600 font-bold py-2 px-4 rounded-full border border-blue-200 shadow-sm text-sm" onClick={()=>{
          navigator('/customer-form')
        }}>
          <Settings size={16} /> Preference
        </button>
      </div>

      <header className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
            <MessageCircle className="text-white w-6 h-6" />
          </div>
          <h1 className="text-4xl font-black text-blue-700 tracking-tight">Story Time</h1>
        </div>
      </header>
      {/* Character Area */}
      <div className="relative w-full max-w-sm flex flex-col items-center justify-center py-6">
        <div className={`absolute flex items-center gap-1 transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-20'}`}>
          {[30, 50, 20, 70, 40, 80, 30, 60].map((h, i) => (
            <div key={i} className={`w-1 bg-blue-400 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <div className="relative z-10 w-44 h-44 rounded-full border-4 border-white shadow-xl overflow-hidden bg-blue-50">
           <img src={Logoimage} alt="Character" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-sm flex flex-col gap-4 mb-8">
        <div className="flex gap-3">
          <button onClick={handlePlayPause} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
            {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
            {isPlaying ? 'Pause' : 'Play Story'}
          </button>
          <button onClick={fetchRecommendedStory} className="flex-1 bg-cyan-500 text-white font-bold py-3 rounded-full shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all">
            <SkipForward fill="currentColor" size={20} /> Next
          </button>
        </div>

        <button 
          onClick={() => { setIsRecording(true); recognitionRef.current?.start(); }}
          className={`w-full ${isRecording ? 'bg-red-500' : 'bg-blue-400'} text-white font-bold py-4 rounded-full shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all`}
        >
          {isRecording ? <MicOff size={24} className="animate-pulse" /> : <Mic size={24} />}
          {isRecording ? 'Listening...' : 'Speak to Character'}
        </button>
      </div>

      {/* Chat Box */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-[2rem] border-4 border-white p-6 shadow-2xl">
        <div className="flex flex-col gap-4">
          <div className="max-h-32 overflow-y-auto space-y-2 mb-2 pr-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-2xl text-sm font-bold shadow-sm ${msg.role === 'user' ? 'bg-sky-100 text-blue-800' : 'bg-blue-600 text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-blue-400 text-xs animate-pulse">Character is thinking...</div>}
          </div>

          <div className="relative flex items-center">
            <input 
              type="text" value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tell me a story about..."
              className="w-full px-5 py-3 rounded-full border-2 border-blue-200 outline-none focus:border-blue-400 text-sm"
            />
            <button onClick={() => handleSendMessage()} className="absolute right-2 p-2 bg-blue-500 text-white rounded-full"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryTimeBlueTheme;