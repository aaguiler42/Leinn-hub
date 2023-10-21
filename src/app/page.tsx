import Link from 'next/link'
import styles from './page.module.css'
import CompaniesList from './components/CompaniesList'
import { Company } from './types/Company'
import Counter from './components/Counter'

const companies: Array<Company> = [
  {
    name: 'Apple',
    logo: '/Untitled.png'
  },
  {
    name: 'Google',
    logo: '/Untitled.png'
  },
  {
    name: 'Microsoft'
  }
]

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Counter</h2>
      <Counter />
      <CompaniesList companies={companies} />
    </main>
  )
}
