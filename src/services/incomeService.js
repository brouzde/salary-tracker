import { getFromStorage, setToStorage, generateId } from './storage'
import { STORAGE_KEYS, INCOME_CATEGORIES } from '../utils/constants'

/**
 * Получение всех доходов
 * @returns {Array} Массив доходов
 */
export const getIncomes = () => {
  const incomes = getFromStorage(STORAGE_KEYS.INCOMES)
  return incomes || []
}

/**
 * Получение дохода по ID
 * @param {string} id - ID дохода
 * @returns {Object|null} Доход или null
 */
export const getIncomeById = (id) => {
  const incomes = getIncomes()
  return incomes.find((item) => item.id === id) || null
}

/**
 * Добавление нового дохода
 * @param {Object} data - Данные дохода (category, amount, date, comment)
 * @returns {Object} Созданный доход с ID
 */
export const addIncome = (data) => {
  const incomes = getIncomes()
  
  // Находим label категории
  const categoryInfo = INCOME_CATEGORIES.find((c) => c.id === data.category)
  
  const newIncome = {
    id: generateId(),
    type: 'income',
    category: data.category,
    categoryLabel: categoryInfo?.label || data.category,
    amount: parseFloat(data.amount) || 0,
    date: data.date || new Date().toISOString().split('T')[0],
    comment: data.comment || '',
    createdAt: new Date().toISOString(),
  }
  
  incomes.push(newIncome)
  setToStorage(STORAGE_KEYS.INCOMES, incomes)
  
  return newIncome
}

/**
 * Обновление дохода
 * @param {string} id - ID дохода
 * @param {Object} data - Обновлённые данные
 * @returns {Object|null} Обновлённый доход или null
 */
export const updateIncome = (id, data) => {
  const incomes = getIncomes()
  const index = incomes.findIndex((item) => item.id === id)
  
  if (index === -1) return null
  
  const categoryInfo = INCOME_CATEGORIES.find((c) => c.id === data.category)
  
  incomes[index] = {
    ...incomes[index],
    category: data.category,
    categoryLabel: categoryInfo?.label || data.category,
    amount: parseFloat(data.amount) || 0,
    date: data.date,
    comment: data.comment || '',
    updatedAt: new Date().toISOString(),
  }
  
  setToStorage(STORAGE_KEYS.INCOMES, incomes)
  
  return incomes[index]
}

/**
 * Удаление дохода
 * @param {string} id - ID дохода
 * @returns {boolean} true если удалён
 */
export const deleteIncome = (id) => {
  const incomes = getIncomes()
  const filtered = incomes.filter((item) => item.id !== id)
  
  if (filtered.length === incomes.length) return false
  
  setToStorage(STORAGE_KEYS.INCOMES, filtered)
  return true
}