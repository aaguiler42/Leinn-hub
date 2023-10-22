"use client";
import clsx from "clsx";
import { Editor } from "novel";
import styles from "./index.module.css";

const areas = [
  "Gestión de proyectos",
  "Gestión de equipos",
  "Gestión de clientes",
  "Gestión de ventas",
  "Gestión de marketing",
  "Gestión de finanzas",
];

export default function Chat({
  companyName,
  onSubmit,
}: {
  companyName: string;
  onSubmit: (message: string) => void;
}) {
  const randomArea = areas[Math.floor(Math.random() * areas.length)];
  const company = decodeURIComponent(companyName);
  const defaultMessage = `Hola ${company}, he visto vuestro perfil por LEINN Hub y además he visto que necesitáis ayuda con la ${randomArea}.
    Ya que mi perfil está orientado a`;

  return (
    <div className={styles.chat}>
      <h2>Haz una proposición a {company}</h2>
      <Editor
        defaultValue={defaultMessage}
        completionApi="/api/chatToEmpresa"
        className={clsx("editor", styles.editor)}
        disableLocalStorage={true}
      />
      <button onClick={() => onSubmit("")}>Enviar proposición</button>
    </div>
  );
}
