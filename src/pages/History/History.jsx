import { useState, useEffect, useMemo } from 'react'
import TransactionList from '../../components/TransactionList/TransactionList'
import Modal from '../../components/Modal/Modal'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import { getIncomes, addIncome, updateIncome, deleteIncome } from '../../services/incomeService'
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../../services/expenseService'
import { formatDateShort } from '../../utils/formatters'
import styles from './History.module.css'

function History() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])

  // Загрузка данных
  const refreshData = () => {
    setIncomes(getIncomes())
    setExpenses(getExpenses())
  }

  useEffect(() => {
    refreshData()
  }, [])

  // Объединение и форматирование всех операций
  const allTransactions = useMemo(() => {
    const formattedIncomes = incomes.map((item) => ({
      ...item,
      dateFormatted: formatDateShort(item.date),
    }))
    const formattedExpenses = expenses.map((item) => ({
      ...item,
      dateFormatted: formatDateShort(item.date),
    }))
    return [...formattedIncomes, ...formattedExpenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [incomes, expenses])

  // Фильтрация
  const filteredTransactions = useMemo(() => {
    let result = allTransactions

    // Фильтр по типу
    if (typeFilter !== 'all') {
      result = result.filter((t) => t.type === typeFilter)
    }

    // Фильтр по периоду
    if (periodFilter !== 'all') {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      
      result = result.filter((t) => {
        const date = new Date(t.date)
        switch (periodFilter) {
          case 'today':
            return date >= today
          case 'week': {
            const weekAgo = new Date(today)
            weekAgo.setDate(weekAgo.getDate() - 7)
            return date >= weekAgo
          }
          case 'month': {
            const monthAgo = new Date(today)
            monthAgo.setMonth(monthAgo.getMonth() - 1)
            return date >= monthAgo
          }
          case 'year': {
            const yearAgo = new Date(today)
            yearAgo.setFullYear(yearAgo.getFullYear() - 1)
            return date >= yearAgo
          }
          default:
            return true
        }
      })
    }

    return result
  }, [allTransactions, typeFilter, periodFilter])

  // Добавление/редактирование
  const handleSubmit = (data) => {
    if (data.id) {
      // Редактирование
      if (data.type === 'income') {
        updateIncome(data.id, data)
      } else {
        updateExpense(data.id, data)
      }
    } else {
      // Добавление
      if (data.type === 'income') {
        addIncome(data)
      } else {
        addExpense(data)
      }
    }
    setIsModalOpen(false)
    setEditingTransaction(null)
    refreshData()
  }

  // Редактирование
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  // Удаление
  const handleDelete = (id) => {
    if (!window.confirm('Удалить операцию?')) return
    
    // Определяем тип по id
    const income = incomes.find((i) => i.id === id)
    if (income) {
      deleteIncome(id)
    } else {
      deleteExpense(id)
    }
    refreshData()
  }

  // Открытие модалки для новой операции
  const handleAdd = () => {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <h1 className={styles.title}>История операций</h1>
        <button className={styles.addButton} onClick={handleAdd}>
          <span className={styles.addIcon}>+</span>
          <span>Добавить операцию</span>
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Тип операции</label>
          <select 
            className={styles.filterSelect}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Период</label>
          <select 
            className={styles.filterSelect}
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
          >
            <option value="all">Всё время</option>
            <option value="today">Сегодня</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="year">Год</option>
          </select>
        </div>
      </div>

      <div className={styles.listContainer}>
        <TransactionList 
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setEditingTransaction(null)
        }}
        title={editingTransaction ? 'Редактирование операции' : 'Новая операция'}
      >
        <TransactionForm 
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingTransaction(null)
          }}
          editData={editingTransaction}
        />
      </Modal>
    </div>
  )
}

export default History