import type { AppData } from '../types'
const KEY = 'expense-tracker-data'
export const safeStorage = { getItem: (key: string) => { try { return localStorage.getItem(key) } catch { return null } }, setItem: (key: string, value: string) => { try { localStorage.setItem(key, value) } catch { /* storage unavailable */ } }, removeItem: (key: string) => { try { localStorage.removeItem(key) } catch { /* storage unavailable */ } } }
export const isAppData = (value: unknown): value is AppData => typeof value === 'object' && value !== null && 'schemaVersion' in value && 'transactions' in value && 'categories' in value && 'budgets' in value && 'alerts' in value && 'settings' in value
export const loadBackup = (): AppData | null => { const raw = safeStorage.getItem(KEY); if (!raw) return null; try { const value: unknown = JSON.parse(raw); return isAppData(value) ? value : null } catch { return null } }
export const saveBackup = (data: AppData) => safeStorage.setItem(KEY, JSON.stringify(data))
export const storageKey = KEY
