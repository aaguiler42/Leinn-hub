import prisma from "@/lib/prisma";

export default async function Users() {
  const users = await prisma.user.findMany();

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
