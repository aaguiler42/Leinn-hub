import Crowdfunding from "../Crowdfunding/Crowfounding";
import styles from "./Dashboard.module.css";
import clsx from "clsx";

export default function Dashboard() {
  return (
    <div className={ clsx(styles.block, styles.crowdfunding) }>
        <div className={styles.titleBox}>
            <p className={styles.title}>!Ayudanos a alcanzar nuestra meta y cambiar vidas!</p>
        </div>
        <Crowdfunding />
    </div>
  );
}