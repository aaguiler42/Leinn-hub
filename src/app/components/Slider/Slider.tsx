'use client'

import React, { useState } from "react";
import styles from './Slider.module.css';

const Slider = () => {
  const [value, setValue] = useState(50); // Initial value

//   const handleChange = (event: React.ChangeEventHandler<HTMLInputElement>) => {
//     setValue(event.);
//   };

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        // onChange={handleChange}
        className={styles.slider}
      />
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default Slider;
