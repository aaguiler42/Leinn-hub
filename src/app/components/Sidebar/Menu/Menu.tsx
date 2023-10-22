"use client";

import React from "react";
import styles from "./Menu.module.css";
import { Links } from "./Links";
import Link from "next/link";

const Menu = ({onNavigation}: {onNavigation: () => void}) => {
  return (
        <div>
            <div className={styles.navMenuItems}>
              {Links.map((item, index) => {
                return (
                  <div key={index} className={styles.navText}>
                    <Link href={item.path} onClick={onNavigation}>
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

