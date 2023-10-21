import Link from "next/link";
import styles from "./page.module.css";
import CompaniesList from "./components/CompaniesList";
import { Company } from "./types/Company";
import Counter from "./components/Counter";
import Sidebar from "./components/Sidebar/Sidebar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import StatCharts from "./components/Chart";
import Crowdfunding from "./components/Crowdfunding/Crowfounding";
import Dashboard from "./components/Dashboard/Dashboard";

export default async function Home() {
  const companies = await prisma.company.findMany();
  const { userId } = auth();

  const stats: any = userId
    ? (
        await prisma.user.findFirst({
          where: {
            clerkId: userId,
          },
        })
      )?.stats ?? null
    : null;

    console.log("test");

  return (
    <div>
      <Dashboard />
      <div>
        {/* <StatCharts stats={stats} /> */}
      </div>
    </div>
  );
}
