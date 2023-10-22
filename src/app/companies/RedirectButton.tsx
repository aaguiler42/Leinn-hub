"use client"
import styles from "./index.module.css";

export default function redirectToChatButton({companyName} : {companyName: string}) {
  return (
    <button className={styles.contactarButton} onClick={() => {
      // redirect to /chat
      window.location.href = `/chat/${companyName}`
    }}>
      Contactar
    </button>
  )
}