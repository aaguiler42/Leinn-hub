import { clsx } from 'clsx'
import styles from './ProgressBar.module.css'

export default function ProgressBar ({ progress, total, className = '', ...props }) {
  const classNames = clsx({
    [styles.total]: true,
    [className]: className
  })

  const width = `${progress / total * 100}%`

  return (
    <div className={classNames} {...props}>
      <div className={styles.progress} style={{ width }} />
    </div>
  )
}
