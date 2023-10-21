import Link from 'next/link'
import styles from './page.module.css'
import CompaniesList from './components/CompaniesList'
import { Company } from './types/Company'
import Counter from './components/Counter'
import prisma from '@/lib/prisma'


export default async function Home() {
  const companies = await prisma.company.findMany()

  return (
    <main className={styles.main}>
      <h2>Counter</h2>
      <Counter />
      <CompaniesList companies={companies} />
    </main>
  )
}
