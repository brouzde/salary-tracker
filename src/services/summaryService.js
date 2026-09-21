import { getIncomes } from './incomeService'
import { getExpenses } from './expenseService'

/**
 * Получение общего баланса (доходы - расходы)
 * @returns {Object} Объект с totalIncome, totalExpense, balance
 */
export const getBalance = () => {
  const incomes = getIncomes()
  const expenses = getExpenses()
  
  const totalIncome = incomes.reduce((sum, item) => sum + (item.amount || 0), 0)
  const totalExpense = expenses.reduce((sum, item) => sum + (item.amount || 0), 0)
  const balance = totalIncome - totalExpense
  
  return {
    totalIncome,
    totalExpense,
    balance,
  }
}

/**
 * Получение данных по категориям (для круговой диаграммы)
 * @param {string} type - Тип операции: 'income' или 'expense'
 * @returns {Array} Массив объектов { name, value }
 */
export const getByCategory = (type = 'expense') => {
  const items = type === 'income' ? getIncomes() : getExpenses()
  
  // Группировка по категориям
  const grouped = items.reduce((acc, item) => {
    const label = item.categoryLabel || item.category
    if (!acc[label]) {
      acc[label] = 0
    }
    acc[label] += item.amount || 0
    return acc
  }, {})
  
  // Преобразование в массив для recharts
  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }))
}

/**
 * Получение сводки по месяцам (для столбчатого графика)
 * @param {number} monthsCount - Количество месяцев (по умолчанию 6)
 * @returns {Array} Массив объектов { name, income, expense }
 */
export const getMonthlySummary = (monthsCount = 6) => {
  const incomes = getIncomes()
  const expenses = getExpenses()
  
  const now = new Date()
  const result = []
  
  // Создаём массив за последние N месяцев
  for (let i = monthsCount - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = date.getFullYear()
    const month = date.getMonth()
    
    const monthName = date.toLocaleDateString('ru-RU', { month: 'short' })
    
    // Сумма доходов за месяц
    const income = incomes
      .filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year && itemDate.getMonth() === month
      })
      .reduce((sum, item) => sum + (item.amount || 0), 0)
    
    // Сумма расходов за месяц
    const expense = expenses
      .filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate.getFullYear() === year && itemDate.getMonth() === month
      })
      .reduce((sum, item) => sum + (item.amount || 0), 0)
    
    result.push({
      name: monthName,
      income,
      expense,
    })
  }
  
  return result
}

/**
 * Получение последних операций (для дашборда)
 * @param {number} limit - Количество операций (по умолчанию 5)
 * @returns {Array} Массив последних операций
 */
export const getRecentTransactions = (limit = 5) => {
  const incomes = getIncomes()
  const expenses = getExpenses()
  
  // Объединяем и сортируем по дате
  const all = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  
  return all.slice(0, limit)
}