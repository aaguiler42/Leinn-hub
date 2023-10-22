import prisma from "@/lib/prisma";
import styles from "./index.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { revalidatePath } from "next/cache";
import { GrMail } from "react-icons/gr";
import { Skills } from "@/app/types/UserAnalysis";
import profilePic from "@/app/assets/profilePic.png";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";

export default async function Users() {
  const users = await prisma.user.findMany({
    where: { State: {
      not: "NotOnboarded"
    } },
});

  async function update(formData: FormData) {
    "use server";

    await prisma.user.update({
      where: { id: Number(formData.get("user")) },
      data: { State: "Accepted" },
    });
    
    revalidatePath("/users");
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
    <main>
      <ul className={styles.users}>
        {users.map((user) => {
          const accepted = user.State === "Accepted";

          return (
            <Link key={user.id} href={`/users/${user.id}`}>
              <li>
              <div className={styles.header}>
                  <div className={styles.picBox}>
                    { user?.imageUrl ? (
                    <img
                      className={styles.profilePic}
                      src={user?.imageUrl as string}
                      alt="Profile Picture"
                    />) : null }
                    {/* (<img
                        className={styles.profilePic}
                        src={profilePic}
                        alt="Profile Picture"
                      />) */}
                  </div>
                  <div className={styles.infosBox}>
                    <div className={styles.inline}>
                      <h1>{user?.name}</h1>
                      {accepted && <div className={styles.accepted}><AiFillCheckCircle size={20} /></div>}
                    </div>
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
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
