"use client"

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn)

  return (
    <nav>
      LEINN Hub
      { isSignedIn
      ? <UserButton 
          afterSignOutUrl="/"
        />
      : <SignInButton
          mode="modal"
          afterSignUpUrl="/"
        >
          Login
        </SignInButton>
      }
    </nav>
  )
}