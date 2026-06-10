import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App