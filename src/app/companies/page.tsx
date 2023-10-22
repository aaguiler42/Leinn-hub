import prisma from "@/lib/prisma";
import styles from "./index.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { revalidatePath } from "next/cache";
import RedirectButton from "./RedirectButton";

export default async function Companies() {
  const companies = await prisma.company.findMany();

  return (
    <main>
      <h1>Companies</h1>
      <ul className={styles.users}>
        {companies.map((company) => {
          const initials = company.name.split(" ").map((word) => word[0]);
          return (
            <li key={company.id}>
              <div className={styles.companyImage}>{initials}</div>
              {company.name}
              <RedirectButton companyName={company.name} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
