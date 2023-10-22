"use client";

import { useState } from "react";
import Modal from "../Modal";
import Button from "../core/Button";

const shouldShow =
  (window.localStorage.getItem("AppPopupAccepted") ?? "false") !== "true";
console.log(shouldShow);

export default function AppPopup() {
  const [showModal, setShowModal] = useState(shouldShow);

  const closeModal = () => {
    setShowModal(false);
    window.localStorage.setItem("AppPopupAccepted", String(showModal));
  };

  if (!showModal) return null;

  return (
    <Modal
      style={{
        height: "50vh",
        maxWidth: "min(500px, 90vw)",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          height: "100%",
          position: "relative",
          overflowY: "auto",
          padding: ".5rem",
          display: "grid",
          gridTemplateRows: "1fr auto",
          gap: "1rem",
        }}
      >
        <div>
          <h2
            style={{
              display: "flex",
              gap: ".2rem",
            }}
          >
            <img
              style={{
                height: "2rem",
                marginRight: "1rem",
              }}
              src="/icon.png"
              alt=""
            />{" "}
            ¡Bienvenido a Leinn Hub!
          </h2>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "1.1rem",
            }}
          >
            Estamos emocionados de tenerte aquí en nuestra comunidad única e
            innovadora. Leinn Hub no es simplemente una plataforma, es tu
            oportunidad de crecer, aprender y conectar con individuos
            apasionados como tú.
          </p>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.1rem",
            }}
          >
            ¿Estás listo para descubrir si posees las cualidades para unirte a
            nuestra comunidad? No esperes más, inicia sesión y comienza tu viaje
            en la plataforma. ¡Estamos ansiosos por tenerte con nosotros!
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: "2rem",
          }}
        >
          <Button
            onClick={closeModal}
            style={{
              padding: ".5rem .3rem",
            }}
          >
            Continuar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
