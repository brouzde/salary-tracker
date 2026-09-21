/**
 * Получение данных из localStorage
 * @param {string} key - Ключ
 * @returns {any} Данные (массив, объект или null)
 */
export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error getting data from storage (key: ${key}):`, error)
    return null
  }
}

/**
 * Сохранение данных в localStorage
 * @param {string} key - Ключ
 * @param {any} value - Данные (массив, объект)
 */
export const setToStorage = (key, value) => {
  try {
    const item = JSON.stringify(value)
    localStorage.setItem(key, item)
  } catch (error) {
    console.error(`Error saving data to storage (key: ${key}):`, error)
  }
}

/**
 * Удаление данных из localStorage
 * @param {string} key - Ключ
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing data from storage (key: ${key}):`, error)
  }
}

/**
 * Генерация уникального идентификатора (UUID)
 * @returns {string} UUID
 */
export const generateId = () => {
  // Используем crypto.randomUUID() если доступен, иначе fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback для старых браузеров
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}