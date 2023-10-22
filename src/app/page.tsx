import Link from "next/link";
import styles from "./page.module.css";
import CompaniesList from "./components/CompaniesList";
import { Company } from "./types/Company";
import Counter from "./components/Counter";
import Sidebar from "./components/Sidebar/Sidebar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import StatCharts from "./components/Chart/Chart";
import Crowdfunding from "./components/Crowdfunding/Crowfounding";
import Dashboard from "./components/Dashboard/Dashboard";

export default async function Home() {
  return (
    <div>
      <Dashboard />
      <div>{/* <StatCharts stats={stats} /> */}</div>
    </div>
  );
}
