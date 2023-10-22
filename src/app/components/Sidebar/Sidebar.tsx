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
import Image from "next/image";
import  darkPinkLogo from "../../../../public/images/darkPinkLogo.png";
import clsx from "clsx";
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
            <div className={styles.logo}>
              <Image src={darkPinkLogo} alt="logo" width={180} height={50} />
            </div>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {(isSignedIn && !isSidebarOpen) && (
                  <div className={styles.avatarSmall}><UserButton afterSignOutUrl="/" /></div>
                ) }
              </div>
            </div>
          </div>
        </div>
        {(isSidebarOpen && isSignedIn) && <div className={clsx(styles.avatarBig, 'avatarBig')}><UserButton afterSignOutUrl="/" /></div> }
        {(isSidebarOpen && !isSignedIn) && 
            <SignInButton
              mode="modal"
              afterSignInUrl="/"
              afterSignUpUrl="/users/onboarding"
            >
              <button className={styles.buttonSignIn}>Acceder</button>
            </SignInButton> }
        {isSidebarOpen && <Menu onNavigation={() => setIsSidebarOpen(false)} />}
      </nav>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <Image src={darkPinkLogo} alt="logo" width={200} height={50} />
          </div>
          <div>
            {isSignedIn ? 
              <div className={clsx(styles.avatarBig, 'avatarBig')}><UserButton afterSignOutUrl="/" /></div>
             : 
             <div className={styles.login}>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/"
                  afterSignUpUrl="/users/onboarding"
                >
                  <button className={styles.buttonSignIn}>Acceder</button>
                </SignInButton>
              </div>
            }
            <Menu onNavigation={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// export default function Sidebar(): any {
