import { clsx } from "clsx";
import AlertIcon from "@/app/components/icons/AlertIcon";

import styles from "./CheckboxField.module.css";

interface CheckboxFieldProps {
  name: string;
  label?: any;
  id?: string;
  className?: string;
  value: boolean;
  [key: string]: any;
}

export default function CheckboxField({
  touched,
  error,
  id,
  label,
  placeholder,
  value,
  ...props
}: CheckboxFieldProps) {
  const classNames = clsx({
    [styles.input]: true,
    [styles.inputValid]: touched && !error,
    [styles.inputError]: touched && error,
  });

  return (
    <div className={styles.field}>
      <input
        checked={value}
        className={classNames}
        id={id}
        placeholder={placeholder ?? label}
        type="checkbox"
        {...props}
      />
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {touched && error && (
            <AlertIcon style={{ height: "1.2em", width: "1.2em" }} />
          )}
        </label>
      )}
    </div>
  );
}
