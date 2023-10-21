'use client'

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from 'react';
import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { isSignedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.sidebar}>
        <div className={styles.burgermenu} onClick={toggleSidebar}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
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
      </div>
    </div>
    
  );
};

export default Sidebar;

// export default function Sidebar(): any {