'use client'

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from 'react';
import styles from './Sidebar.module.css'
import { SidebarLinks } from './Links';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';

const Sidebar = () => {
  const { isSignedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className='burger'>
        <Link href='#'>
          <FaBars onClick={setIsSidebarOpen} />
        </Link>
      </div>
      <div className={styles.content}>
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
          <div className={styles.logo}>
            <Link href='#' className='closeSidebar'>
              x
            </Link>
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
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Sidebar;

// export default function Sidebar(): any {