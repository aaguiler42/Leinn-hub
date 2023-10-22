import { ImCross } from "react-icons/im";
import styles from "./index.module.css";

function Close(props: { onClose?: () => void }) {
  return (
    <div className={styles.close} onClick={props.onClose}>
      <ImCross />
    </div>
  );
}

export default function Modal(props: {
  showX: boolean;
  height?: string;
  width?: string;
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onClose} />
      <div className={styles.modal}>
        {props.showX && <Close onClose={props.onClose} />}
        {props.children}
      </div>
    </>
  );
}
