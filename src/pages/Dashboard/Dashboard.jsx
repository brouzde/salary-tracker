import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BalanceCard from '../../components/BalanceCard/BalanceCard'
import TransactionList from '../../components/TransactionList/TransactionList'
import Modal from '../../components/Modal/Modal'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import { getBalance, getRecentTransactions } from '../../services/summaryService'
import { addIncome } from '../../services/incomeService'
import { addExpense } from '../../services/expenseService'
import styles from './Dashboard.module.css'

function Dashboard() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [balanceData, setBalanceData] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 })
  const [recentTransactions, setRecentTransactions] = useState([])

  const refreshData = () => {
    setBalanceData(getBalance())
    setRecentTransactions(getRecentTransactions(5))
  }

  useEffect(() => {
    refreshData()
  }, [])

  const handleSubmit = (data) => {
    if (data.type === 'income') {
      addIncome(data)
    } else {
      addExpense(data)
    }
    setIsModalOpen(false)
    refreshData()
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Главная</h1>
        <button 
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          <span className={styles.addIcon}>+</span>
          <span>Добавить операцию</span>
        </button>
      </div>

      <div className={styles.cardsGrid}>
        <BalanceCard 
          title="Доходы" 
          amount={balanceData.totalIncome} 
          color="var(--success)"
        />
        <BalanceCard 
          title="Расходы" 
          amount={balanceData.totalExpense} 
          color="var(--danger)"
        />
        <BalanceCard 
          title="Баланс" 
          amount={balanceData.balance} 
          color="var(--primary)"
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Последние операции</h2>
        <TransactionList 
          transactions={recentTransactions}
          onEdit={() => navigate('/history')}
          onDelete={() => navigate('/history')}
        />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Новая операция"
      >
        <TransactionForm 
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default Dashboard