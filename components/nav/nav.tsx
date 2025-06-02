import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import Creadits from "./credits";
import Credits from "./credits";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl flex h-16 items-center mx-auto justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Next Video</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-primary"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary"
          >
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <Link href={"/dashboard"}>Dashboard</Link>
              <Link href={"/buy-credits"}>
                <Credits />
              </Link>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
          {!user && (
            <button className="cursor-pointer">
              <SignInButton>Sign in</SignInButton>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
