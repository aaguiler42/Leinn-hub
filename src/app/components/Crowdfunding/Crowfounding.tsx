'use client'

import { useState } from "react"
import ProgressBar from "./../core/ProgressBar";
import styles from "./Crowdfunding.module.css";

export default function Crowdfunding() {

  return (
    <div>
      <ProgressBar
        className={styles.progress}
        progress={66}
        total={100}
        style={{
        "--colorPrimary": "var(--primary)",
        "--colorSecondary": "var(--primary-light)",
        "--height": "30px",
        }}
      />
      <div className={styles.box}>
        <p className={styles.text}>€350.000 de €500.000 recaudados hasta ahora.</p>
      </div>
    </div>
  );
}