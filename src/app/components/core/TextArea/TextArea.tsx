import { forwardRef } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  expandable?: boolean;
  debounceTime?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const expand = (target: HTMLTextAreaElement) => {
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    { className = "", expandable, value, onChange, ...props },
    ref
  ) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);

      if (expandable) expand(e.target);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (expandable) expand(e.target);
    };

    return (
      <textarea
        className={`${styles.textArea ?? ""} ${className}`}
        value={value ?? ""}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={ref}
        {...props}
      />
    );
  }
);

export default TextArea;
