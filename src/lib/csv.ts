import type { Category, Transaction } from '../types'
const quote = (value: string) => `"${value.replace(/"/g, '""')}"`
export const transactionsToCsv = (transactions: Transaction[], categories: Category[]) => ['Date,Type,Category,Amount,Note', ...transactions.map(t => [t.date, t.type, categories.find(c => c.id === t.categoryId)?.name ?? 'Deleted category', (t.amountPaise / 100).toFixed(2), t.note].map(quote).join(','))].join('\n')
