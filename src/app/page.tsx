import CompaniesList from "./components/CompaniesList";
import { CompanyContributing } from "./types/Company";
import Sidebar from "./components/Sidebar/Sidebar";
import prisma from "@/lib/prisma";

import { auth } from "@clerk/nextjs";
import StatCharts from "./components/Chart";

export default async function Home() {
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
  const companies = await getCompanies();

  return (
    <div>
      <Sidebar />
      <div>
        <StatCharts stats={stats} />
      </div>
      <div>text</div>
      <CompaniesList companies={companies} />
    </div>
  );
}

async function getCompanies(): Promise<CompanyContributing[]> {
  const companies = await prisma.company.findMany({
    include: {
      contributions: {
        select: {
          amount: true,
        },
      },
    },
  });

  const companiesWithContributions = companies.map((company) => {
    const totalContributions = company.contributions.reduce(
      (acc, contribution) => acc + contribution.amount,
      0
    );

    return {
      id: company.id,
      name: company.name,
      contribution: totalContributions,
    };
  });

  return companiesWithContributions;
}
