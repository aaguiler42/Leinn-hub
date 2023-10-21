import { clsx } from "clsx";
import Spinner from "../../icons/Spinner";
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  style?: any;
  loading?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  children?: ReactNode;
  className?: any;
  variant?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  className,
  variant = "primary",
  loading,
  disabled,
  ...props
}: Props) => {
  const classNames = clsx({
    [styles.button]: true,
    [styles[variant]]: true,
    [className]: className,
    [styles.loading]: loading,
  });

  return (
    <button disabled={disabled || loading} className={classNames} {...props}>
      {loading ? (
        <Spinner style={{ height: "23px", width: "23px" }} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
