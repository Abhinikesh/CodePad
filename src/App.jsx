import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import { fetchPastes } from './redux/pasteSlice'

function RootLayout() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPastes())
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f11]">
      <Navbar />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/pastes', element: <Paste /> },
      { path: '/pastes/:id', element: <ViewPaste /> }
    ]
  }
])

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [fadeProp, setFadeProp] = useState({
    opacity: 1,
    visibility: 'visible'
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeProp({
        opacity: 0,
        visibility: 'hidden'
      })
      const unmountTimer = setTimeout(() => {
        setShowSplash(false)
      }, 500)
      return () => clearTimeout(unmountTimer)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {showSplash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f0f11',
            opacity: fadeProp.opacity,
            visibility: fadeProp.visibility,
            transition: 'opacity 0.5s ease, visibility 0.5s ease'
          }}
        >
          <div className="flex flex-col items-center">
            <img
              src="/Raimic_logo.png"
              alt="Raimic Logo"
              className="w-24 h-24 object-contain splash-logo"
            />
            <h1 className="text-white font-bold text-2xl tracking-widest mt-6">
              CodePad
            </h1>
            <p className="text-gray-500 text-xs tracking-wider mt-1 uppercase">
              Save, Share & Manage
            </p>
            <div className="w-32 bg-[#1e1e2f] h-[2px] rounded-full mt-8 overflow-hidden">
              <div className="splash-progress-bar" />
            </div>
          </div>
        </div>
      )}
      <RouterProvider router={router} />
    </div>
  )
}

export default App