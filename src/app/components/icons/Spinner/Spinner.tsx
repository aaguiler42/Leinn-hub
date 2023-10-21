import styles from './Spinner.module.css'

export default function Spinner ({ style } : any) {
  return (
    <div
      className={styles.spinner}
      style={{
        border: '2px solid rgba(0, 0, 0, 0.1)',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        borderLeftColor: '#fff',
        ...style
      }}
    />
  )
}
