import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import Creadits from "./credits";
import Credits from "./credits";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="absolute  top-0 left-0 z-40 flex items-center w-full bg-indigo-600 ud-header">
      <div className="container px-4 mx-auto">
        <div className="relative flex items-center justify-between -mx-4">
          <div className="w-full px-4">
            <Link
              href="/"
              className="block w-full py-5 text-white text-2xl font-bold"
            >
              Next Video
            </Link>
          </div>
          <div className="flex items-center justify-between w-full px-4">
            <div>
              <button
                id="navbarToggler"
                className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              </button>
            </div>
            <div className="flex items-center justify-between pr-16 lg:pr-0">
              <div className="hidden sm:flex gap-4 items-center">
                {user && (
                  <>
                    <Link className="text-white" href={"/dashboard"}>
                      Dashboard
                    </Link>
                    <Link href={"/buy-credits"}>
                      <Credits />
                    </Link>
                  </>
                )}
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <button className="px-6 py-2 text-base font-medium text-white duration-300 ease-in-out rounded-md bg-white/20 signUpBtn hover:bg-white/100 hover:text-dark">
                      Sign in
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
