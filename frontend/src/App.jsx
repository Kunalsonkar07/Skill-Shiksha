import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter" data-theme="autumn">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          
          <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        </Routes>
    </div>
  )
}

export default App
