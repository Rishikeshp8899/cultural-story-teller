import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import {
createBrowserRouter,
RouterProvider,
} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Home from './component/Home/Home.tsx'
import Login from './component/Login/Login.tsx'
import Register from './component/Register/Register.tsx'
import Dashboard from './component/videos/Dashboard.tsx'
import Comments from './component/video-comment/comment.tsx'
import CustomerForm from './component/Customer-preference-form/CustomerForm.tsx'
import AuthProvider from './auth/CheckAuth.tsx'
import ProtectedRoute from './auth/ProtectedRoute.tsx'
import CheckAuth from './auth/CheckAuth.tsx'

const router = createBrowserRouter([{
  path:'',
  element:(
    <App />
  ),
  children:[
    {
      path:'/',
      element:(
        <Home />
      )
    },
    {
      path:'/home',
      element:(
        <Home />
      )
    },
      {
      path:'/login',
      element:(
        <CheckAuth>
          <Login />
        </CheckAuth>
     
      )
    }
    ,
    {
      path:'/register',
      element:(
        <CheckAuth>
          <Register />
        </CheckAuth>
      
      )
    },
    {
      path:'/videos',
      element:(
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
       
      )
    }
      
      ,
      {
        path:'/customer-form',
        element:(
           <ProtectedRoute>
            <CustomerForm />
           </ProtectedRoute>
         
        )
      }
    

  ]
}])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
