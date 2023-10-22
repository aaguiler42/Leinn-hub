"use client";
import { Company } from "@prisma/client";
import styles from "./index.module.css";
import { useState } from "react";
import Modal from "../components/Modal";
import Chat from "../components/Chat";

export default function ContactButton({ company }: { company: Company }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className={styles.contactButton}
        onClick={() => setShowModal(true)}
      >
        Contactar
      </button>
      {showModal && (
        <Modal showX onClose={() => setShowModal(false)}>
          <Chat
            companyName={company.name}
            onSubmit={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
