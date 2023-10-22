import Crowdfunding from "../Crowdfunding/Crowfounding";
import styles from "./Dashboard.module.css";
import clsx from "clsx";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const contributions = await prisma.contribution.findMany({
    include: {
      company: {
        select: {
          name: true
        },
      }
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <div className={ clsx(styles.block, styles.crowdfundingBox) }>
          <div className={styles.titleBox}>
              <p className={styles.title}>!Ayudanos a alcanzar nuestra meta y cambiar vidas!</p>
          </div>
          <Crowdfunding />
      </div>
      <div className={ clsx(styles.block, styles.contributionsBox) }>
        <div className={styles.titleBox}>
            <p className={styles.title}>Últimas contribuciones</p>
        </div>
        <ul className={styles.contributions}>
        {contributions.map((contribution) => {
          return (
            <li key={contribution.id}>
              <span>{contribution.company.name} {contribution.amount}</span>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}