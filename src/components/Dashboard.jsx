import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

function formatCurrency(amount) {
  return '₹' + Math.round(amount).toLocaleString('en-IN')
}

const COLORS = ['#34D399', '#60A5FA', '#FBBF24', '#F87171', '#A78BFA', '#FB923C', '#22D3EE', '#F472B6', '#A3E635', '#94A3B8']

function Dashboard({ transactions, currentBalance, backendUrl }) {
  const [insight, setInsight] = useState('')
  const [loadingInsight, setLoadingInsight] = useState(true)

  const totalCredit = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0)
  const totalDebit = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0)

  const categoryTotals = {}
  transactions.filter(t => t.type === 'debit').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
  })
  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))

  useEffect(() => {
    if (transactions.length === 0) {
      setInsight('Add some transactions to get AI-powered spending insights.')
      setLoadingInsight(false)
      return
    }
    generateInsight()
  }, [transactions.length])

  async function generateInsight() {
    setLoadingInsight(true)
    try {
      const summary = transactions.map(t => `${t.type === 'credit' ? '+' : '-'}₹${t.amount} ${t.category} (${t.merchant})`).join(', ')
      const res = await fetch(`${backendUrl}/api/insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, totalCredit, totalDebit, currentBalance })
      })
      const data = await res.json()
      setInsight(data.insight || 'Unable to generate insight right now.')
    } catch (e) {
      setInsight('Could not connect to AI insight service.')
    }
    setLoadingInsight(false)
  }

  return (
    <>
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Current Balance</div>
          <div className="stat-value">{formatCurrency(currentBalance)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Credited</div>
          <div className="stat-value positive">+{formatCurrency(totalCredit)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value negative">−{formatCurrency(totalDebit)}</div>
        </div>
      </div>

      <div className="insight-card">
        <div className="insight-header">
          <span className="insight-badge">AI INSIGHT</span>
        </div>
        <div className="insight-text">
          {loadingInsight ? <span className="insight-loading">Analyzing your spending...</span> : insight}
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="chart-card">
          <div className="chart-title">Spending by Category</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  )
}

export default Dashboard
