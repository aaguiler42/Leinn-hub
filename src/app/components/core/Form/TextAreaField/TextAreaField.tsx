import { clsx } from "clsx";
import AlertIcon from "../../../icons/AlertIcon";

import styles from "./TextAreaField.module.css";

interface TextFieldProps {
  name: string;
  label?: any;
  type?: string;
  id?: string;
  className?: string;
  value: any;
  onChange: any;
  [key: string]: any;
}

export default function TextAreaField({
  touched,
  error,
  id,
  label = "Escribe aquí...",
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
      <textarea
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
