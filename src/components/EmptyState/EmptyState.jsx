import styles from './EmptyState.module.css'

function EmptyState({ 
  title = 'Нет данных', 
  description = 'Данные появятся позже', 
  actionLabel, 
  onAction,
  icon = '📭'
}) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      {description && (
        <div className={styles.description}>{description}</div>
      )}
      {actionLabel && onAction && (
        <button className={styles.actionButton} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState