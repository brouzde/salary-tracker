import EmptyState from '../EmptyState/EmptyState'
import styles from './TransactionList.module.css'

function TransactionList({ transactions = [], onEdit, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState 
        icon="📋"
        title="Нет операций"
        description="Добавьте первую операцию, чтобы увидеть её здесь"
      />
    )
  }

  // Временная иконка по категории (будет заменена на реальную логику)
  const getIcon = (category) => {
    const icons = {
      salary: '💼',
      groceries: '🛒',
      utilities: '💡',
      rent: '🏠',
      transport: '🚗',
      entertainment: '🎬',
      default: '💰'
    }
    return icons[category] || icons.default
  }

  return (
    <div className={styles.list}>
      {transactions.map((transaction) => (
        <div key={transaction.id} className={styles.row}>
          <div className={styles.icon}>
            {getIcon(transaction.category)}
          </div>
          
          <div className={styles.info}>
            <div className={styles.category}>
              {transaction.categoryLabel || transaction.category}
            </div>
            <div className={styles.date}>
              {transaction.date || 'Дата не указана'}
            </div>
          </div>

          <div className={`${styles.amount} ${styles[transaction.type]}`}>
            {transaction.type === 'income' ? '+' : '-'}
            {(transaction.amount ?? 0).toLocaleString('ru-RU')} ₽
          </div>

          {(onEdit || onDelete) && (
            <div className={styles.actions}>
              {onEdit && (
                <button 
                  className={styles.actionButton}
                  onClick={() => onEdit(transaction)}
                  title="Редактировать"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button 
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => onDelete(transaction.id)}
                  title="Удалить"
                >
                  🗑️
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TransactionList