"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { Links } from "./Menu/Links";
import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import Menu from "./Menu/Menu";

const Sidebar = () => {
  const { isSignedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav
        className={`${styles.navbar} ${
          isSidebarOpen ? styles.navbarOpen : styles.navbarClosed
        }`}
      >
        <div className={styles.topNavbar}>
          {isSidebarOpen ? (
            <AiOutlineClose onClick={toggleSidebar} />
          ) : (
            <FaBars onClick={toggleSidebar} />
          )}
          <div className={styles.alignNavbar}>
            <div></div>
            <div>LEINN Hubff</div>
            <div style={{position: 'relative'}}>
            <div style={{position: 'absolute', top: 0, left: 0, transform: 'translate(-50%, -50%)'}}>{isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/"
                  afterSignUpUrl="/users/onboarding"
                >
                  <button className={styles.buttonSignIn}>Acceder</button>
                </SignInButton>
            )}</div>
            </div>
          </div>
        </div>
        {isSidebarOpen && <Menu /> }
      </nav>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>LEINN Hub</div>
          <div>
            <Menu />
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton
                mode="modal"
                afterSignInUrl="/"
                afterSignUpUrl="/users/onboarding"
              >
                <button className={styles.buttonSignIn}>Acceder</button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// export default function Sidebar(): any {
