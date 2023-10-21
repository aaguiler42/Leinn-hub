import prisma from "@/lib/prisma";
import Chart from "@/app/components/Chart"
import styles from "./page.module.css";
import { GrMail } from 'react-icons/gr';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await prisma.user.findFirst()
  const defaultSkills = [
    'Frontend',
    'Diseño Gráfico',
    'Trabajo en Equipo',
    'Comunicación',
    'Creatividad',
    'Innovación',
    'Liderazgo',
    'Empatía',
    'Proactividad',
    'Adaptabilidad',
    'Resolución de Problemas',
    'Pensamiento Crítico',
    'Tolerancia a la Frustración',
    'Responsabilidad',
    'Autogestión',
    'Organización',
    'Planificación',
    'Gestión del Tiempo',
    'Toma de Decisiones',
    'Comunicación Asertiva',
    'Negociación',
    'Resiliencia',
    'Confianza',
    'Autoconocimiento',
    'Autoestima',
    'Autoconfianza',
    'Inteligencia Emocional',
  ]

  const skills = defaultSkills.sort((a, b) => Math.random() - 0.5).slice(0, 3)

  return <div>
    {/* Header */}
    <div className={styles.header}>
      <img className={styles.profilePic} src={user?.imageUrl as string} alt="Profile Picture" />
      <div className={styles.infosBox}>
        <h1>{user?.name}</h1>
        <div className={styles.mail}>
          <GrMail />
          <p>{user?.email}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
          {skills.map(skill => {
              return (<div key={skill}>
                {skill} 
              </div>)
              }
            )}
        </div>
      </div>
    </div>
    {/* Body */}
    <div className={styles.body}>
      <div>
        <h2>Análisis del perfil</h2>
        <div>
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. Nulla nec odio eget nunc porttitor luctus. 
          Lorem ipsum dolor sit am et, consectetur adipiscing elit. </div>
      </div>
      <div>
        TELA DE ARANA
        <Chart />
      </div>
    </div>
  </div>;
}
