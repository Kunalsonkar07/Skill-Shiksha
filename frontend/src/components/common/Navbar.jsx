import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../services/operations/authAPI"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { matchPath, useLocation } from "react-router-dom"
import { NavbarLinks } from "../../data/navbar-links"
import { BsCart } from "react-icons/bs";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await apiConnector("GET", categories.CATEGORIES_API)
      console.log("Printing subLinks: ", res)
      setSubLinks(res.data.data)
    } catch (error) {
      console.error(
        "Could not fetch Categories.",
        error.response ? error.response.data : error.message
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOptionClick = () => {
    setDropdownOpen(false);
  };

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
  return (
    <div
      className="relative z-50 flex items-center justify-center py-4 transition-all duration-300"
      style={{ boxShadow: "rgba(234, 235, 244, 0.95) 0px 4px 10px" }}
    >
      <nav className="flex h-[35px] w-[95%] max-w-maxScreen justify-between">
        <a
          className="flex justify-center items-center gap-x-3"
          href="/"
          aria-label="CodeHelp Logo"
        >
          <div>SkillSkishka</div>
        </a>

        <ul className="hidden items-center gap-x-8  lg:flex text-neutral-9 dark:text-neutral-2">
          <li>
            <a href="/">
              <div className="py-5 text-base leading-5 relative group flex gap-1 items-center hover:text-[#6674CC] transition-all duration-150  ">
                <span>Home</span>
                <span className="hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 22 22"
                    className="w-6 h-6 group-hover:fill-indigo-600 fill-indigo-600"
                  >
                    <path d="M11 14.667a.92.92 0 0 1-.587-.21l-5.5-4.584A.918.918 0 1 1 6.086 8.46l4.913 4.107 4.914-3.96a.917.917 0 0 1 1.292.137.917.917 0 0 1-.128 1.339l-5.5 4.427a.92.92 0 0 1-.578.156"></path>
                  </svg>
                </span>
              </div>
            </a>
          </li>

          <nav className="hidden md:block">
            <ul>
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Course" ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      {/* Toggle element */}
                      <div className="py-5 text-base leading-5 flex gap-1 items-center hover:text-[#6674CC] transition-all duration-150 cursor-pointer">
                        <p>{link.title}</p>
                        <BsChevronDown />
                      </div>

                      {/* Dropdown */}
                      {dropdownOpen && (
                        <div className="absolute left-1/2 z-[1000] bg-neutral-900 flex w-[200px] -translate-x-1/2 translate-y-[0em] flex-col rounded-lg p-4 text-white shadow-lg transition-all duration-150 lg:w-[300px]">
                          {loading ? (
                            <div>Loading...</div>
                          ) : (
                            subLinks?.map((subLink, index) => (
                              <Link
                                key={index}
                                to={`/course/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                onClick={handleOptionClick}
                              >
                                <p className="block px-4 py-2 hover:bg-indigo-600 hover:text-white transition-colors">
                                  {subLink.name}
                                </p>
                              </Link>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <li>
            <a href="/contact">
              <div className="py-5 text-base leading-5 relative group flex gap-1 items-center hover:text-[#6674CC] transition-all duration-150 font-normal">
                <span>Contact</span>
                <span className="hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 22 22"
                    className="w-6 h-6 group-hover:fill-indigo-600 fill-neutral-9 dark:fill-neutral-2"
                  >
                    <path d="M11 14.667a.92.92 0 0 1-.587-.21l-5.5-4.584A.918.918 0 1 1 6.086 8.46l4.913 4.107 4.914-3.96a.917.917 0 0 1 1.292.137.917.917 0 0 1-.128 1.339l-5.5 4.427a.92.92 0 0 1-.578.156"></path>
                  </svg>
                </span>
              </div>
            </a>
          </li>
          <li>
            <a href="/about">
              <div className="py-5 text-base leading-5 relative group flex gap-1 items-center hover:text-[#6674CC] transition-all duration-150 font-normal">
                <span>AboutUs</span>
                <span className="hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 22 22"
                    className="w-6 h-6 group-hover:fill-indigo-600 fill-neutral-9 dark:fill-neutral-2"
                  >
                    <path d="M11 14.667a.92.92 0 0 1-.587-.21l-5.5-4.584A.918.918 0 1 1 6.086 8.46l4.913 4.107 4.914-3.96a.917.917 0 0 1 1.292.137.917.917 0 0 1-.128 1.339l-5.5 4.427a.92.92 0 0 1-.578.156"></path>
                  </svg>
                </span>
              </div>
            </a>
          </li>
          <li>
            <a href="/chat">
              <div className="py-5 text-base leading-5 relative group flex gap-1 items-center hover:text-[#6674CC] transition-all duration-150 font-normal">
                <span>Chat</span>
                <span className="hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 22 22"
                    className="w-6 h-6 group-hover:fill-indigo-600 fill-neutral-9 dark:fill-neutral-2"
                  >
                    <path d="M11 14.667a.92.92 0 0 1-.587-.21l-5.5-4.584A.918.918 0 1 1 6.086 8.46l4.913 4.107 4.914-3.96a.917.917 0 0 1 1.292.137.917.917 0 0 1-.128 1.339l-5.5 4.427a.92.92 0 0 1-.578.156"></path>
                  </svg>
                </span>
              </div>
            </a>
          </li>
        </ul>



        {/* Mobile menu button */}
        <button
          className="block lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 dark:text-neutral-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-neutral-2 dark:bg-neutral-9 text-neutral-9 dark:text-neutral-2 shadow-lg lg:hidden z-50">
            <ul className="flex flex-col gap-3 p-4">
              <li>
                <a href="/" className="block py-2 px-4 hover:bg-indigo-600 hover:text-white rounded">
                  Home
                </a>
              </li>
              <li>
                <a href="/#courses" className="block py-2 px-4 hover:bg-indigo-600 hover:text-white rounded">
                  Courses
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="/dashboard/quick-compiler"
                  className="block py-2 px-4 hover:bg-indigo-600 hover:text-white rounded"
                >
                  Explore
                </a>
              </li>
              <li>
                <a href="/contact" className="block py-2 px-4 hover:bg-indigo-600 hover:text-white rounded">
                  Contact
                </a>
              </li>
              <li>
                <a href="/dashboard/articles" className="block py-2 px-4 hover:bg-indigo-600 hover:text-white rounded">
                  Articles
                </a>
              </li>

              <li>
                <div>
                  {
                    user ? (<div></div>) : (
                      <a
                        href="/login"
                        className="block py-2 sm:w-[30%] w-[50%] px-4 text-center bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all"
                      >
                        Login
                      </a>
                    )
                  }
                </div>

              </li>

            </ul>
          </div>
        )}

        <div>
          {user ? (
            <div className="flex items-center gap-4">
            {/* Cart icon */}
              <Link to="/dashboard/cart" className="text-white hover:text-indigo-400 transition-colors text-xl">
                <BsCart />
              </Link>
            
              {/* User menu dropdown */}
              <UserMenu />
            </div>
          ) : (
            <div className="hidden items-center gap-x-2 font-rubik lg:flex">
              <a
                href="/login"
                className="btn btn-primary !p-3 !rounded-btn h-auto w-full min-w-[140px] max-w-xs bg-primary"
              >
                Login
              </a>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
}

function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen((open) => !open)}
        className="flex items-center gap-x-1"
      >
        <img
          alt="Profile Pic"
          loading="lazy"
          width="40"
          height="40"
          decoding="async"
          className="rounded-full object-cover w-9 h-9"
          src={user?.profilePicture || "https://www.gravatar.com/avatar/" + user?._id + "?d=mp&f=y"}
          style={{ color: "transparent" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down w-5 h-5 transition-transform ${
            dropdownOpen ? "rotate-180" : "rotate-0"
          } stroke-neutral-10 dark:stroke-neutral-2 self-center`}
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-48 rounded-md bg-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <ul className="py-1 text-sm text-white">
            <li>
              <a
                href="/dashboard/my-profile"
                className="block px-4 py-2 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                Dashboard
              </a>
            </li>
            <li>
              <div
                onClick={() => {
                  dispatch(logout(navigate))
                  setOpen(false)
                }}
                className="block px-4 py-2 hover:bg-indigo-600 hover:text-white transition-colors"
              >
                Logout
              </div>
            </li>
          </ul>
        </div>


      )}
    </div>
  );
}
