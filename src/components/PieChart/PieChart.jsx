import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './PieChart.module.css'

// Fallback цвета
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

function PieChart({ data = [], title }) {
  if (!data || data.length === 0) {
    return (
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>🥧</div>
        <div className={styles.placeholderText}>Нет данных для графика</div>
        <div className={styles.placeholderDescription}>
          Добавьте операции, чтобы увидеть распределение
        </div>
      </div>
    )
  }

  return (
    <div className={styles.chart}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value.toLocaleString('ru-RU')} ₽`}
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)'
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChart