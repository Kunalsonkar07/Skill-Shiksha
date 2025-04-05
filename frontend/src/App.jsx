import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import Catalog from "./pages/Catalog.jsx";

function App() {
  return (
    <div
      className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter"
      data-theme="autumn"
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="catalog/:catalogName" element={<Catalog/>}/>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
