"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import styles from "./Menu.module.css";
import { Links } from "./Links";
import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const Menu = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
        <div>
            <div className={styles.navMenuItems}>
              {Links.map((item, index) => {
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
  );
};

export default Menu;

