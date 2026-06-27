import { useState } from 'react'
import { CATEGORIES } from '../data/transactions'

function AddTransactionModal({ onAdd, onClose }) {
  const [type, setType] = useState('debit')
  const [merchant, setMerchant] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = () => {
    if (!merchant.trim() || !amount || parseFloat(amount) <= 0) return
    onAdd({
      merchant: merchant.trim(),
      amount: parseFloat(amount),
      category,
      type,
      date
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Add Transaction</div>

        <div className="type-toggle">
          <div
            className={`type-btn ${type === 'debit' ? 'active debit' : ''}`}
            onClick={() => setType('debit')}
          >
            − Debit
          </div>
          <div
            className={`type-btn ${type === 'credit' ? 'active credit' : ''}`}
            onClick={() => setType('credit')}
          >
            + Credit
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Merchant / Description</label>
          <input
            className="form-input"
            placeholder="e.g. Swiggy, Rent, Salary"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add Transaction</button>
        </div>
      </div>
    </div>
  )
}

export default AddTransactionModal
