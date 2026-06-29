import React, { useState, useRef, useEffect ,useContext} from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const {token,setToken} = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)

  const dropdownRef = useRef()

 const logout = () => {
  localStorage.removeItem("token")
  setToken("")
  navigate("/")
}

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  const  {userData} = useContext(AppContext)

  return (
    
    <div className="flex items-center justify-between px-4 sm:px-8 lg:px-20 py-4 border-b bg-[#E3FDFD] sticky top-0 z-50">

      {/* Logo */}
      <img src={assets.logo} alt="" className="w-12 sm:w-12 cursor-pointer" />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

        {["/", "/doctors", "/about", "/contact"].map((path, i) => {
          const labels = ["Home", "All Doctors", "About", "Contact"]
          return (
            <NavLink key={i} to={path} className="group">
              {({ isActive }) => (
                <div>
                  <li className="cursor-pointer">{labels[i]}</li>
                  <hr className={`h-[0.1vw] bg-blue-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </div>
              )}
            </NavLink>
          )
        })}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>

        {/* Profile */}
        {token && userData ? (
          <>
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img className="w-8 rounded-full" src={userData.image} alt="" />
              <img
                className={`w-2.5 transition ${openDropdown ? "rotate-180" : ""}`}
                src={assets.dropdown_icon}
                alt=""
              />
            </div>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-xl border p-4 flex flex-col gap-3 z-20">
                <p onClick={() => { navigate("/my-profile"); setOpenDropdown(false) }} className="cursor-pointer hover:text-black">
                  My Profile
                </p>
                <p onClick={() => { navigate("/my-appointment"); setOpenDropdown(false) }} className="cursor-pointer hover:text-black">
                  My Appointment
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-red-500">
                  Logout
                </p>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />

      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/40 z-40 transition ${showMenu ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setShowMenu(false)} />

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-[#E3FDFD] shadow-lg z-50 transform transition-transform duration-300 ${showMenu ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <img src={assets.logo} className="w-28" alt="" />
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className="w-6 cursor-pointer" alt="" />
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
          <NavLink to="/" onClick={() => setShowMenu(false)}>Home</NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>All Doctors</NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>Contact</NavLink>

          {!token && (
            <button
              onClick={() => { navigate('/login'); setShowMenu(false) }}
              className="bg-blue-600 text-white py-2 rounded-full mt-4"
            >
              Create Account
            </button>
          )}
        </ul>

      </div>

    </div>
  )
}

export default Navbar
