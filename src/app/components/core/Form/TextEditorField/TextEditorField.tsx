import { clsx } from "clsx";

import styles from "./TextEditorField.module.css";
import TextEditor from "../../TextEditor";
import AlertIcon from "@/app/components/icons/AlertIcon";

interface TextEditorFieldProps {
  name: string;
  label?: any;
  handleChange: (arg: any) => void;
  id?: string;
  className?: string;
  placeholder?: string;
  [key: string]: any;
}

export default function TextEditorField({
  value,
  label,
  handleChange,
  error,
  touched,
  id,
  ...props
}: TextEditorFieldProps) {
  const classNames = clsx({
    [styles.input]: true,
    [styles.inputValid]: touched && !error,
    [styles.inputError]: true,
  });

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <TextEditor
        value={value}
        setValue={handleChange}
        className={classNames}
        {...props}
      />

      {touched && error && (
        <span className={styles.error}>
          <AlertIcon /> {error}
        </span>
      )}
    </div>
  );
}
