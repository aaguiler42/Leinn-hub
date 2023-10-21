'use client'

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from 'react';
import styles from './Sidebar.module.css'
import { SidebarLinks } from './Links';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

const Sidebar = () => {
  const { isSignedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
        <nav className={`${styles.navbar} ${isSidebarOpen ? styles.navbarOpen : styles.navbarClosed}`}>
            {isSidebarOpen 
            ? <AiOutlineClose onClick={toggleSidebar}/> 
            : <FaBars onClick={toggleSidebar}/> }
        </nav>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.logo}>
            LEINN Hub
          </div>
          <div>
            <div className={styles.navMenuItems}>
              {SidebarLinks.map((item, index) => {
                return (
                  <div key={index} className={styles.navText}>
                    <Link href={item.path}>
                      {item.icon}
                      <span className={styles.textLinks}>{item.title}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
              { isSignedIn 
                ? <UserButton afterSignOutUrl="/" />
                : <SignInButton
                    mode="modal"
                    afterSignUpUrl="/"
                  >
                    Login
                  </SignInButton>
              }
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Sidebar;

// export default function Sidebar(): any {