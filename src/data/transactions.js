// Starting balance for the demo account
export const STARTING_BALANCE = 24500

export const CATEGORIES = [
  'Food & Dining', 'Shopping', 'Transport', 'Bills & Utilities',
  'Entertainment', 'Groceries', 'Health', 'Transfer', 'Salary', 'Other'
]

export const CATEGORY_ICONS = {
  'Food & Dining': '🍔',
  'Shopping': '🛍️',
  'Transport': '🚗',
  'Bills & Utilities': '💡',
  'Entertainment': '🎬',
  'Groceries': '🛒',
  'Health': '💊',
  'Transfer': '↔️',
  'Salary': '💰',
  'Other': '📦'
}

// Seed transactions, oldest first — balanceAfter chains correctly
export const SEED_TRANSACTIONS = [
  { id: 1, date: '2026-06-20', merchant: 'Salary Credit', category: 'Salary', type: 'credit', amount: 45000 },
  { id: 2, date: '2026-06-21', merchant: 'Zomato', category: 'Food & Dining', type: 'debit', amount: 420 },
  { id: 3, date: '2026-06-21', merchant: 'Big Bazaar', category: 'Groceries', type: 'debit', amount: 1850 },
  { id: 4, date: '2026-06-22', merchant: 'Uber', category: 'Transport', type: 'debit', amount: 230 },
  { id: 5, date: '2026-06-23', merchant: 'Electricity Bill', category: 'Bills & Utilities', type: 'debit', amount: 1200 },
  { id: 6, date: '2026-06-24', merchant: 'Amazon', category: 'Shopping', type: 'debit', amount: 2399 },
  { id: 7, date: '2026-06-25', merchant: 'Netflix', category: 'Entertainment', type: 'debit', amount: 199 },
  { id: 8, date: '2026-06-26', merchant: 'Friend Transfer', category: 'Transfer', type: 'credit', amount: 1500 },
]

// Computes balanceBefore/balanceAfter for a list of transactions given a starting balance
export function computeRunningBalances(transactions, startingBalance) {
  let balance = startingBalance
  return transactions.map(txn => {
    const balanceBefore = balance
    const delta = txn.type === 'credit' ? txn.amount : -txn.amount
    balance = balance + delta
    return { ...txn, balanceBefore, balanceAfter: balance }
  })
}
