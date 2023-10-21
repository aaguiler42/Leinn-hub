import { ClerkProvider } from "@clerk/nextjs";
import styles from "./CenteredLayout.module.css";

export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className={styles.centralBlock}>{children}</div>
  );
}


