"use client";

import React, { useState } from "react";
import styles from "./Slider.module.css";
import TextField from "../core/Form/TextField";
import Button from "../core/Button";

const Slider = () => {
  const [value, setValue] = useState("hola"); // Initial value

  return (
    <div className={styles.sliderContainer}>
      <TextField
        name=""
        value={value}
        onChange={(e: any) => {
          if (
            (Number(e.target.value) < 0 ||
              Number.isNaN(Number(e.target.value))) &&
            e.target.value !== ""
          )
            return;
          if (Number(e.target.value) > 10000) {
            setValue("10000");
            return;
          }
          setValue(e.target.value);
        }}
        label="Donación"
      />
      <Button onClick={() => setValue("")}>Contribuir</Button>
    </div>
  );
};

export default Slider;
