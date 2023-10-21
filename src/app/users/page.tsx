import prisma from "@/lib/prisma";
import styles from "./index.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { revalidatePath } from "next/cache";

export default async function Users() {
  const users = await prisma.user.findMany();

  async function update(formData: FormData) {
    "use server";

    await prisma.user.update({
      where: { id: Number(formData.get("user")) },
      data: { State: "Accepted" },
    });

    revalidatePath("/users");
  }

  return (
    <main>
      <h1>Users</h1>
      <ul className={styles.users}>
        {users.map((user) => {
          const accepted = user.State === "Accepted";

          return (
            <li key={user.id}>
              <img src={user.imageUrl} alt="User Image" />
              {user.name} <span className={styles.badge}>98</span>
              {!accepted && (
                <form action={update} className={styles.actions}>
                  <input
                    type="text"
                    name="user"
                    value={user.id}
                    readOnly
                    hidden
                  />
                  <button className={styles.button}>
                    <BsCheckCircle size={20} />
                  </button>
                </form>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
