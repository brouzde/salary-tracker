import { CURRENCY } from './constants'

/**
 * Форматирование суммы в узбекские сумы
 * @param {number} amount - Сумма
 * @returns {string} Отформатированная строка (например, "1 234 567 сўм")
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return `0 ${CURRENCY.symbol}`
  
  return `${Number(amount).toLocaleString(CURRENCY.locale)} ${CURRENCY.symbol}`
}

/**
 * Форматирование даты в русский формат
 * @param {string} dateString - Дата в формате ISO (YYYY-MM-DD)
 * @returns {string} Отформатированная дата (например, "21 сентября 2026")
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

/**
 * Форматирование даты в короткий формат
 * @param {string} dateString - Дата в формате ISO
 * @returns {string} Короткая дата (например, "21.09.2026")
 */
export const formatDateShort = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  
  return date.toLocaleDateString('ru-RU')
}

/**
 * Получение названия месяца
 * @param {number} month - Номер месяца (0-11)
 * @returns {string} Название месяца (например, "Сентябрь")
 */
export const getMonthName = (month) => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  return months[month] || ''
}