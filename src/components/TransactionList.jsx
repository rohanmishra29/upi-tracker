import { CATEGORY_ICONS } from '../data/transactions'

function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN')
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="txn-list">
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div>No transactions yet. Add one or upload a statement.</div>
        </div>
      </div>
    )
  }

  // Show most recent first
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id)

  return (
    <div className="txn-list">
      {sorted.map(txn => (
        <div className="txn-row" key={txn.id}>
          <div className="txn-info">
            <div className={`txn-icon ${txn.type}`}>
              {CATEGORY_ICONS[txn.category] || '📦'}
            </div>
            <div>
              <div className="txn-merchant">{txn.merchant}</div>
              <div className="txn-meta">{formatDate(txn.date)}</div>
            </div>
          </div>

          <div className="txn-category">{txn.category}</div>

          <div className={`txn-amount ${txn.type}`}>
            {txn.type === 'credit' ? '+' : '−'}{formatCurrency(txn.amount)}
          </div>

          <div className="txn-balance">
            <div className="txn-balance-label">BALANCE</div>
            <div className="txn-balance-flow">
              {formatCurrency(txn.balanceBefore)}
              <span className="txn-balance-arrow">→</span>
              {formatCurrency(txn.balanceAfter)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList
