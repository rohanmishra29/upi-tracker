import { useRef, useState } from 'react'
import Papa from 'papaparse'

function UploadStatement({ onImport, onClose }) {
  const fileInputRef = useRef(null)
  const [error, setError] = useState('')
  const [parsing, setParsing] = useState(false)

  const handleFile = (file) => {
    if (!file) return
    setError('')
    setParsing(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const rows = results.data
          const parsed = rows.map((row, i) => {
            // Flexible column matching — handles common bank statement headers
            const date = row.Date || row.date || row.DATE || new Date().toISOString().split('T')[0]
            const merchant = row.Description || row.description || row.Narration || row.merchant || 'Unknown'
            const debitAmt = parseFloat(row.Debit || row.debit || row['Withdrawal Amt'] || 0) || 0
            const creditAmt = parseFloat(row.Credit || row.credit || row['Deposit Amt'] || 0) || 0

            const type = creditAmt > 0 ? 'credit' : 'debit'
            const amount = creditAmt > 0 ? creditAmt : debitAmt

            return {
              merchant: merchant.toString().slice(0, 40),
              amount,
              type,
              category: 'Other',
              date: normalizeDate(date)
            }
          }).filter(t => t.amount > 0)

          if (parsed.length === 0) {
            setError('No valid transactions found. Check your CSV has Date, Description, Debit/Credit columns.')
            setParsing(false)
            return
          }

          onImport(parsed)
          onClose()
        } catch (e) {
          setError('Failed to parse file. Make sure it\'s a valid CSV.')
        }
        setParsing(false)
      },
      error: () => {
        setError('Failed to read file.')
        setParsing(false)
      }
    })
  }

  function normalizeDate(dateStr) {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0]
    return d.toISOString().split('T')[0]
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Upload Statement</div>

        <div
          className="upload-zone"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-zone-icon">📄</div>
          <div className="upload-zone-text">
            {parsing ? 'Parsing...' : 'Click to upload your bank/UPI statement (CSV)'}
          </div>
          <div className="upload-zone-sub">Supports columns: Date, Description, Debit, Credit</div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {error && (
          <div style={{ color: '#F87171', fontSize: '12px', marginTop: '12px' }}>{error}</div>
        )}

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose} style={{ width: '100%' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default UploadStatement
