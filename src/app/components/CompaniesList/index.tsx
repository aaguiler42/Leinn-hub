"use client";

import { CompanyContributing } from "../../types/Company";
import styles from "./index.module.css";

export default function CompaniesList({
  companies,
}: {
  companies: Array<CompanyContributing>;
}) {
  return (
    <div
      style={{
        position: "absolute",
        background: "white",
        left: "50%",
      }}
    >
      <div className={styles.list}>
        {companies.map((c) => {
          const { name, logo } = c;
          return (
            <div className={styles.company} key={name}>
              {name}
              {<img src={"/Untitled.png"} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
