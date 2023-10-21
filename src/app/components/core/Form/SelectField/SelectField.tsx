import { clsx } from "clsx";
import Dropdown from "../../Dropdown";
import AlertIcon from "@/app/components/icons/AlertIcon";

import styles from "./SelectField.module.css";

interface SelectFieldProps {
  name: string;
  label?: any;
  onChange: (arg: any) => void;
  id?: string;
  className?: string;
  placeholder?: string;
  [key: string]: any;
}

export default function SelectField({
  options,
  value,
  label,
  onChange,
  error,
  touched,
  placeholder,
  id,
  ...props
}: SelectFieldProps) {
  const classNames = clsx({
    [styles.input]: true,
    [styles.inputValid]: touched && !error,
    [styles.inputError]: true,
  });

  return (
    <div className={styles.field}>
      <Dropdown
        data={options}
        form
        setValue={onChange}
        value={value}
        className={classNames}
        placeholder={placeholder}
        id={id}
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
