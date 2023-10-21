import Link from 'next/link'
import styles from './page.module.css'
import CompaniesList from './components/CompaniesList'
import { Company } from './types/Company'
import Counter from './components/Counter'
import Sidebar from './components/Sidebar/Sidebar'
import prisma from '@/lib/prisma'

import { auth } from '@clerk/nextjs'
import Chart from './components/Chart'

export default async function Home() {
  const companies = await prisma.company.findMany()
  const { userId } = auth();
 
  const stats: any  = userId 
  ? (await prisma.user.findFirst({
    where: {
      clerkId: userId,
    },
  }))?.stats ?? null : null;

  return (
    <div>
      <Sidebar />
      <div>
        <Chart stats={stats} />
      </div>
      <div>text</div>
    </div>
    
    )
  }
  