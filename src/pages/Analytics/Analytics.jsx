import { useState, useEffect } from 'react'
import PieChart from '../../components/PieChart/PieChart'
import BarChart from '../../components/BarChart/BarChart'
import { getByCategory, getMonthlySummary } from '../../services/summaryService'
import styles from './Analytics.module.css'

function Analytics() {
  const [expenseCategoryData, setExpenseCategoryData] = useState([])
  const [incomeCategoryData, setIncomeCategoryData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])

  const refreshData = () => {
    setExpenseCategoryData(getByCategory('expense'))
    setIncomeCategoryData(getByCategory('income'))
    setMonthlyData(getMonthlySummary(6))
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <h1 className={styles.title}>Аналитика</h1>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <PieChart 
            data={expenseCategoryData}
            title="Расходы по категориям"
          />
        </div>

        <div className={styles.chartCard}>
          <PieChart 
            data={incomeCategoryData}
            title="Доходы по категориям"
          />
        </div>

        <div className={styles.chartCard}>
          <BarChart 
            data={monthlyData}
            title="Доходы и расходы по месяцам"
          />
        </div>
      </div>
    </div>
  )
}

export default Analytics