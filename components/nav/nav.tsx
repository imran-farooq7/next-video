import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const Navbar = async() => {
  const user = await currentUser()
  
  return (
    <div
      className="absolute  top-0 left-0 z-40 flex items-center w-full bg-primary ud-header"
    >
      <div className="container px-4 mx-auto">
        <div className="relative flex items-center justify-between -mx-4">
          <div className="max-w-full px-4 w-60">
            <Link href="/" className="block w-full py-5 text-white text-2xl font-bold">
              Next Video
            </Link>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <div>
              <button
                id="navbarToggler"
                className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span
                  className="relative my-[6px] block h-[2px] w-[30px] bg-white"
                ></span>
                <span
                  className="relative my-[6px] block h-[2px] w-[30px] bg-white"
                ></span>
                <span
                  className="relative my-[6px] block h-[2px] w-[30px] bg-white"
                ></span>
              </button>
              <nav
                id="navbarCollapse"
                className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6"
              >
                <ul className="blcok lg:flex 2xl:ml-20">
                  
                  <li className="relative group">
                    <Link
                      href="#about"
                      className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                    >
                      About
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link
                      href="#pricing"
                      className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link
                      href="#team"
                      className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                    >
                      Team
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link
                      href="#contact"
                      className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link
                      href="#blog"
                      className="flex py-2 mx-8 text-base font-medium ud-menu-scroll text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                    >
                      Blog
                    </Link>
                  </li>
                
                </ul>
              </nav>
            </div>
            <div className="flex items-center justify-end pr-16 lg:pr-0">
              <div className="hidden sm:flex gap-4 items-center">
              {user && (
                  <Link className='text-white' href={"/dashboard"}>Dashboard</Link>
                )}
                <SignedIn >
               <UserButton />
                </SignedIn>
                <SignedOut>
                <SignInButton >
                  <button className="px-6 py-2 text-base font-medium text-white duration-300 ease-in-out rounded-md bg-white/20 signUpBtn hover:bg-white/100 hover:text-dark"
                  >Sign in</button>
                </SignInButton>
              
                </SignedOut>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar