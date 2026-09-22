import { formatCurrency } from '../../utils/formatters'
import styles from './BalanceCard.module.css'

function BalanceCard({ title, amount = 0, color = 'var(--primary)', description }) {
  return (
    <div className={styles.card}>
      <div 
        className={styles.indicator}
        style={{ '--indicator-color': color }}
      />
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div 
          className={styles.amount}
          style={{ '--amount-color': color }}
        >
          {formatCurrency(amount)}
        </div>
        {description && (
          <div className={styles.description}>{description}</div>
        )}
      </div>
    </div>
  )
}

export default BalanceCard