import { useState, useMemo } from 'react'
import Dashboard from './components/Dashboard'
import TransactionList from './components/TransactionList'
import AddTransactionModal from './components/AddTransactionModal'
import UploadStatement from './components/UploadStatement'
import { SEED_TRANSACTIONS, STARTING_BALANCE, computeRunningBalances } from './data/transactions'

const BACKEND_URL = 'https://upi-tracker-server.onrender.com'

function App() {
  const [rawTransactions, setRawTransactions] = useState(SEED_TRANSACTIONS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Sort by date, then recompute running balances in chronological order
  const transactions = useMemo(() => {
    const sorted = [...rawTransactions].sort((a, b) => new Date(a.date) - new Date(b.date) || a.id - b.id)
    return computeRunningBalances(sorted, STARTING_BALANCE)
  }, [rawTransactions])

  const currentBalance = transactions.length > 0
    ? transactions[transactions.length - 1].balanceAfter
    : STARTING_BALANCE

  const handleAddTransaction = (txn) => {
    setRawTransactions(prev => [...prev, { ...txn, id: Date.now() }])
  }

  const handleImportTransactions = (newTxns) => {
    const withIds = newTxns.map((t, i) => ({ ...t, id: Date.now() + i }))
    setRawTransactions(prev => [...prev, ...withIds])
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="topbar-logo">💸 UPI Tracker</div>
        <div className="topbar-actions">
          <button className="btn btn-ghost" onClick={() => setShowUploadModal(true)}>
            📄 Upload Statement
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            + Add Transaction
          </button>
        </div>
      </div>

      <div className="main-content">
        <Dashboard
          transactions={transactions}
          currentBalance={currentBalance}
          backendUrl={BACKEND_URL}
        />

        <div className="section-header">
          <div className="section-title">Transaction History</div>
        </div>
        <TransactionList transactions={transactions} />
      </div>

      {showAddModal && (
        <AddTransactionModal
          onAdd={handleAddTransaction}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showUploadModal && (
        <UploadStatement
          onImport={handleImportTransactions}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  )
}

export default App
