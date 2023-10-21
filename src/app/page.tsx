import Link from 'next/link'
import styles from './page.module.css'
import CompaniesList from './components/CompaniesList'
import { Company } from './types/Company'
import Counter from './components/Counter'
import Sidebar from './components/Sidebar/Sidebar'
import prisma from '@/lib/prisma'


export default async function Home() {
  const companies = await prisma.company.findMany()

  return (
    <div>
      <Sidebar />
      <div>text</div>
    </div>
    
    )
  }
  