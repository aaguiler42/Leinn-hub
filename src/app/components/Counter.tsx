'use client'

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(120)


  const handleClick = (action: 'increment' | 'decrement') => {
    if (action === 'increment') {
      setCount(count + 1)
    } else {
      setCount(count - 1)
    }
  }

  return (
    <div>
      <button onClick={() => handleClick('increment')}>+</button>
      {count}
      <button onClick={() => handleClick('decrement')}>-</button>
    </div>
  )
}