export type TransactionType = 'expense' | 'income'
export type Theme = 'light' | 'dark' | 'system'
export interface Category { id: string; name: string; type: TransactionType; icon: string; color: string }
export interface Transaction { id: string; type: TransactionType; amountPaise: number; date: string; categoryId: string; note: string; createdAt: string }
export interface Budget { id: string; month: string; categoryId: string | null; limitPaise: number }
export interface Alert { id: string; budgetId: string; month: string; threshold: 80 | 100; message: string; read: boolean; createdAt: string }
export interface Settings { currency: string; theme: Theme; notifications: boolean; onboardingComplete: boolean; lastBackupAt: string | null }
export interface AppData { schemaVersion: number; categories: Category[]; transactions: Transaction[]; budgets: Budget[]; alerts: Alert[]; settings: Settings }
export interface TransactionDraft { type: TransactionType; amount: string; date: string; categoryId: string; note: string }
