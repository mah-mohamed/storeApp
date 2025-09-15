import React from 'react'
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";


const NavBar = () => {
  let user = true
  let isAdmin = true
  const logout = ()=>{}
  let cart = { length : 3}
  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
      <div className='container mx-auto px-5 py-4 flex flex-wrap justify-between items-center'>
        <Link
        to={'/'}
        className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex'>
          t9elchi
        </Link>
        <div className='flex justify-evenly items-center mx-4 px-1 gap-6'>
          {/* home */}
          <Link
          to={'/'}
          className='text-white hover:text-emerald-400 transition duration-300 ease-in-out text-xl'>
            Home
          </Link>

          {/* cart for user */}

          { user ? <Link to={'/cart'}>
           <ShoppingCart className='inline-block mr-1 ' size={26} color='white'/>
           { cart.length > 0 &&
           <span className='relative -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>
            {cart.length}
           </span>}
          </Link> : 
                   (<div className='flex justify-evenly items-center gap-3 px-1'>
            <Link to={'/login'}
            className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'>
                  <LogIn className='mr-2' size={18} />
									Login
            </Link>

            <Link to={'/sign-up'} 
            className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out'>
                  <UserPlus className='mr-2' size={18} />
									Sign Up
            </Link>
                     </div>)
          }

          {/* dashbord for admin */}
          {isAdmin && (
            <Link to={'/secret-dashboard'}
            className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'>
              <Lock className='inline-block mr-1' size={18}/>
              Dashbord
            </Link>
          )}

          {/* logout for user */}
          {user && (
            <button
								className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						               rounded-md flex items-center transition duration-300 ease-in-out cursor-pointer'
								onClick={logout}
							>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
          )
          }
        </div> 
      </div>
    </header>
  )
}

export default NavBar
