import { useState } from "react";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Catalog from "./pages/Catalog.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";

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
        <Route path="courses/:courseId" element={<CourseDetails/>}/>
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword/>
              </OpenRoute>
            }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

          <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
          />

          <Route
            path="/about"
            element={
                <About/>
            }
            />

            <Route
            path="/contact"
            element={
                <Contact/>
            }
            />

            <Route
              element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              }
              >
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route path="dashboard/settings" element={<Settings/>}/>
                  {
                    user?.accountType === ACCOUNT_TYPE.STUDENT && (
                      <>
                      <Route path="dashboard/cart" element={<Cart />} />
                      <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                      </>
                    )
                  }

                  {
                    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                      <>
                      <Route path="dashboard/add-course" element={<AddCourse />} />
                      <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                      <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                      </>
                    )
                  }
              </Route>


      </Routes>
    </div>
  );
}

export default App;
