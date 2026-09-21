import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './BarChart.module.css'

function BarChart({ data = [], title }) {
  if (!data || data.length === 0) {
    return (
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>📊</div>
        <div className={styles.placeholderText}>Нет данных для графика</div>
        <div className={styles.placeholderDescription}>
          Добавьте операции, чтобы увидеть динамику
        </div>
      </div>
    )
  }

  return (
    <div className={styles.chart}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => `${value.toLocaleString('ru-RU')} ₽`}
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}
          />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Доходы" />
          <Bar dataKey="expense" fill="#ef4444" name="Расходы" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChart