import { getFromStorage, setToStorage, generateId } from './storage'
import { STORAGE_KEYS, EXPENSE_CATEGORIES } from '../utils/constants'

/**
 * Получение всех расходов
 * @returns {Array} Массив расходов
 */
export const getExpenses = () => {
  const expenses = getFromStorage(STORAGE_KEYS.EXPENSES)
  return expenses || []
}

/**
 * Получение расхода по ID
 * @param {string} id - ID расхода
 * @returns {Object|null} Расход или null
 */
export const getExpenseById = (id) => {
  const expenses = getExpenses()
  return expenses.find((item) => item.id === id) || null
}

/**
 * Добавление нового расхода
 * @param {Object} data - Данные расхода (category, amount, date, comment)
 * @returns {Object} Созданный расход с ID
 */
export const addExpense = (data) => {
  const expenses = getExpenses()
  
  // Находим label категории
  const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.id === data.category)
  
  const newExpense = {
    id: generateId(),
    type: 'expense',
    category: data.category,
    categoryLabel: categoryInfo?.label || data.category,
    amount: parseFloat(data.amount) || 0,
    date: data.date || new Date().toISOString().split('T')[0],
    comment: data.comment || '',
    createdAt: new Date().toISOString(),
  }
  
  expenses.push(newExpense)
  setToStorage(STORAGE_KEYS.EXPENSES, expenses)
  
  return newExpense
}

/**
 * Обновление расхода
 * @param {string} id - ID расхода
 * @param {Object} data - Обновлённые данные
 * @returns {Object|null} Обновлённый расход или null
 */
export const updateExpense = (id, data) => {
  const expenses = getExpenses()
  const index = expenses.findIndex((item) => item.id === id)
  
  if (index === -1) return null
  
  const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.id === data.category)
  
  expenses[index] = {
    ...expenses[index],
    category: data.category,
    categoryLabel: categoryInfo?.label || data.category,
    amount: parseFloat(data.amount) || 0,
    date: data.date,
    comment: data.comment || '',
    updatedAt: new Date().toISOString(),
  }
  
  setToStorage(STORAGE_KEYS.EXPENSES, expenses)
  
  return expenses[index]
}

/**
 * Удаление расхода
 * @param {string} id - ID расхода
 * @returns {boolean} true если удалён
 */
export const deleteExpense = (id) => {
  const expenses = getExpenses()
  const filtered = expenses.filter((item) => item.id !== id)
  
  if (filtered.length === expenses.length) return false
  
  setToStorage(STORAGE_KEYS.EXPENSES, filtered)
  return true
}