import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Feed from './pages/Feed.jsx'
import EmployerLogin from './pages/EmployerLogin.jsx'
import EmployerRegister from './pages/EmployerRegister.jsx'
import EmployerDashboard from './pages/EmployerDashboard.jsx'
import CandidateLogin from './pages/CandidateLogin.jsx'
import CandidateRegister from './pages/CandidateRegister.jsx'
import CandidateApplications from './pages/CandidateApplications.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='/employer'>
          
          <Route path='/employer/login' element={<EmployerLogin />} />
          <Route path='/employer/register' element={<EmployerRegister />} />
          <Route path='/employer/dashboard' element={<EmployerDashboard />} />
      </Route>
      <Route path='/employee/feed' element={<Feed />} />
      <Route path='/candidate/register' element={<CandidateRegister />} />
      <Route path='/candidate/login' element={<CandidateLogin />} />
      <Route path='/candidate/applications' element={<CandidateApplications />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
   
  </StrictMode>,
)
