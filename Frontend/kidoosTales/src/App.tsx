import { Outlet } from "react-router-dom"
import './App.css'

function App() {

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white h-full w-full">
<Outlet />
    </div>
     
    </>
  )
}

export default App

