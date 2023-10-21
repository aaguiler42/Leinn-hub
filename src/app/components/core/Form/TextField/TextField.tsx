import { clsx } from "clsx";
import AlertIcon from "../../../icons/AlertIcon";

import styles from "./TextField.module.css";
import Image from "next/image";

interface TextFieldProps {
  name: string;
  label?: any;
  type?: string;
  id?: string;
  className?: string;
  [key: string]: any;
}

export default function TextField({
  touched,
  error,
  id,
  label,
  placeholder,
  ...props
}: TextFieldProps) {
  const classNames = clsx({
    [styles.input]: true,
    [styles.inputValid]: touched && !error,
    [styles.inputError]: touched && error,
  });

  return (
    <div className={styles.field}>
      <input
        className={classNames}
        id={id}
        placeholder={placeholder ?? label}
        {...props}
      />
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      {touched && error && (
        <span className={styles.error}>
          <AlertIcon /> {error}
        </span>
      )}
    </div>
  );
}
