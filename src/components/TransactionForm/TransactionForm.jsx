import { useState, useEffect } from 'react'
import styles from './TransactionForm.module.css'

// Fallback категории, если константы ещё не импортированы
const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Зарплата' },
  { id: 'freelance', label: 'Подработка' },
  { id: 'bonus', label: 'Премия' },
  { id: 'other', label: 'Прочее' },
]

const EXPENSE_CATEGORIES = [
  { id: 'groceries', label: 'Продукты' },
  { id: 'utilities', label: 'Коммуналка' },
  { id: 'rent', label: 'Аренда' },
  { id: 'other', label: 'Прочее' },
]

function TransactionForm({ onSubmit, onCancel, editData }) {
  const [type, setType] = useState(editData?.type || 'income')
  const [category, setCategory] = useState(editData?.category || '')
  const [amount, setAmount] = useState(editData?.amount || '')
  const [date, setDate] = useState(editData?.date || new Date().toISOString().split('T')[0])
  const [comment, setComment] = useState(editData?.comment || '')

  // Обновление категории при смене типа
  useEffect(() => {
    const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
    if (!category || !categories.find(c => c.id === category)) {
      setCategory(categories[0]?.id || '')
    }
  }, [type, category])

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const selectedCategory = categories.find(c => c.id === category)
    
    onSubmit({
      id: editData?.id,
      type,
      category,
      categoryLabel: selectedCategory?.label || category,
      amount: parseFloat(amount) || 0,
      date,
      comment
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.typeSelector}>
        <button
          type="button"
          className={`${styles.typeButton} ${type === 'income' ? styles.typeButtonActiveIncome : ''}`}
          onClick={() => setType('income')}
        >
          Доход
        </button>
        <button
          type="button"
          className={`${styles.typeButton} ${type === 'expense' ? styles.typeButtonActiveExpense : ''}`}
          onClick={() => setType('expense')}
        >
          Расход
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Категория</label>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Сумма (₽)</label>
        <input
          type="number"
          className={styles.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Дата</label>
        <input
          type="date"
          className={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Комментарий</label>
        <input
          type="text"
          className={styles.input}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Необязательно"
        />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className={styles.submitButton}>
          {editData ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm