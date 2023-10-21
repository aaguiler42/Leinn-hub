'use client'

import Image from "next/image"
import { Company } from "../../types/Company"
import styles from './index.module.css'
import { useState } from "react"

export default function CompaniesList({
  companies
}: {
  companies: Array<Company>
}) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  return (
    <div>
      {selectedCompany ?? 'No company selected'}
      <div className={styles.list}>
        {companies.map(c => {
          const { name, logo } = c
          return (
            <div className={styles.company} key={name}  onClick={() => setSelectedCompany(name)}>
              {name}
              {logo && <img src={logo} />}
            </div>
          )
        })}
      </div>
    </div>

  )
}