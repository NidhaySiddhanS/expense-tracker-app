import type { Category } from '../types'
const expense = [['Food','🍜','#f97316'],['Rent','🏠','#6366f1'],['Transport','🚌','#0ea5e9'],['Bills','💡','#eab308'],['Shopping','🛍️','#ec4899'],['Health','💊','#22c55e'],['Entertainment','🎬','#a855f7'],['Education','📚','#14b8a6'],['Travel','✈️','#06b6d4'],['Other','📦','#64748b']]
const income = [['Salary','💼','#16a34a'],['Freelance','💻','#0284c7'],['Gift','🎁','#db2777'],['Other','✨','#64748b']]
export const defaultCategories = (): Category[] => [...expense.map(([name,icon,color]) => ({ id: `expense-${name!.toLowerCase()}`, name: name!, icon: icon!, color: color!, type: 'expense' as const })), ...income.map(([name,icon,color]) => ({ id: `income-${name!.toLowerCase()}`, name: name!, icon: icon!, color: color!, type: 'income' as const }))]
