import prisma from "@/lib/prisma";
import Chart from "@/app/components/Chart/Chart";
import styles from "./page.module.css";
import { GrMail } from "react-icons/gr";
import clsx from "clsx";
import { Skills } from "@/app/types/UserAnalysis";

export default async function Page({
  params = { id: "1" },
}: {
  params: { id: string };
}) {
  let user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!user) {
    user = await prisma.user.findFirst();
  }
  const defaultSkills = [
    "Frontend",
    "Diseño Gráfico",
    "Trabajo en Equipo",
    "Comunicación",
    "Creatividad",
    "Innovación",
    "Liderazgo",
    "Empatía",
    "Proactividad",
    "Adaptabilidad",
    "Resolución de Problemas",
    "Pensamiento Crítico",
    "Tolerancia a la Frustración",
    "Responsabilidad",
    "Autogestión",
    "Organización",
    "Planificación",
    "Gestión del Tiempo",
    "Toma de Decisiones",
    "Comunicación Asertiva",
    "Negociación",
    "Resiliencia",
    "Confianza",
    "Autoconocimiento",
    "Autoestima",
    "Autoconfianza",
    "Inteligencia Emocional",
  ];

  const skills = defaultSkills.sort((a, b) => Math.random() - 0.5).slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.picBox}>
          <img
            className={styles.profilePic}
            src={user?.imageUrl as string}
            alt="Profile Picture"
          />
        </div>
        <div className={styles.infosBox}>
          <h1>{user?.name}</h1>
          <div className={styles.mail}>
            <GrMail />
            <p>{user?.email}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
            {skills.map((skill) => {
              return (
                <div className={styles.tag} key={skill}>
                  {skill}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Body */}
      <div className={styles.body}>
        <div className={styles.column}>
          <h3>Análisis del perfil</h3>
          <div className={styles.bodyText}>{user?.analysis}</div>
        </div>
        <div className={styles.column}>
          <h3>Skills graph</h3>
          <div className={styles.chart}>
            <Chart skills={user?.stats as Skills} />
          </div>
        </div>
      </div>
    </div>
  );
}
