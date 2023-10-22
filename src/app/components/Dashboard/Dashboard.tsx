import Crowdfunding from "../Crowdfunding/Crowfounding";
import styles from "./Dashboard.module.css";
import clsx from "clsx";
import prisma from "@/lib/prisma";
import { FaEuroSign, FaPercent, FaUserAlt } from "react-icons/fa";

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
              <p className={styles.title}>¡Áyudanos a alcanzar nuestra meta y cambiar vidas!</p>
          </div>
          <Crowdfunding />
          <div className={styles.statsBox}>
            <div className={styles.valuesBox}>
              <div className={styles.number}>
                <span className={styles.numTxt}>350m</span>
                <FaEuroSign size ={25} className={styles.euroIcon}/>
              </div>
              <div className={styles.textValue}>recaudados de €500.000</div>
            </div>
            <div className={styles.valuesBox}>
              <div className={styles.number}>
                <span className={styles.numTxt}>66</span>
                <FaPercent size ={25} className={styles.percentIcon}/>
              </div>
              <div className={styles.textValue}>porcentaje alcanzado</div>
            </div>
            <div className={styles.valuesBox}>
              <div className={styles.number}>
                <span className={styles.numTxt}>66</span>
                <FaUserAlt size ={25} className={styles.userIcon}/>
              </div>
              <div className={styles.textValue}>leinners financiados</div>
            </div>
        </div>
      </div>
      <div className={ clsx(styles.block, styles.contributionsBox) }>
        <div className={styles.titleBox}>
            <p className={styles.title}>Últimas contribuciones</p>
        </div>
        <ul className={styles.contributions}>
        {contributions.map((contribution) => {
          return (
            <li key={contribution.id}>
              <div className={styles.box}>
                <div className={styles.name}>{contribution.company.name}</div>
                <div className={styles.amount}>
                  <div>
                    <FaEuroSign size ={25} className={styles.euroIconContributions}/>
                  </div>
                  <div>
                    {contribution.amount}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      </div>
    </div>
  );
}