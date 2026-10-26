import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { defaultCategories } from '../lib/categories'
import { computeNewAlerts } from '../lib/budgets'
import { safeStorage } from '../storage'
import type { AppData, Budget, Category, Settings, Transaction } from '../types'
const initialSettings: Settings = { currency: 'INR', theme: 'system', notifications: false, onboardingComplete: false, lastBackupAt: null }
const initial: AppData = { schemaVersion: 1, categories: defaultCategories(), transactions: [], budgets: [], alerts: [], settings: initialSettings }
type Store = AppData & { addTransaction: (t: Omit<Transaction, 'id'|'createdAt'>) => void; updateTransaction: (id:string,t:Omit<Transaction,'id'|'createdAt'>)=>void; deleteTransaction:(id:string)=>void; saveCategory:(c:Omit<Category,'id'> & {id?:string})=>void; deleteCategory:(id:string)=>void; saveBudget:(b:Omit<Budget,'id'> & {id?:string})=>void; deleteBudget:(id:string)=>void; markAllRead:()=>void; clearAlerts:()=>void; updateSettings:(s:Partial<Settings>)=>void; replaceData:(d:AppData)=>void; erase:()=>void }
const withAlerts = (state: AppData): Partial<Store> => ({ alerts: [...state.alerts, ...computeNewAlerts(state.budgets, state.transactions, state.categories, state.alerts)] })
export const useAppStore = create<Store>()(persist((set) => ({ ...initial,
 addTransaction: t => set(s => { const next={...s,transactions:[{...t,id:crypto.randomUUID(),createdAt:new Date().toISOString()},...s.transactions]}; return withAlerts(next) }),
 updateTransaction: (id,t) => set(s => { const next={...s,transactions:s.transactions.map(x=>x.id===id?{...x,...t}:x)}; return withAlerts(next) }),
 deleteTransaction: id => set(s => { const next={...s,transactions:s.transactions.filter(t=>t.id!==id)}; return withAlerts(next) }),
 saveCategory: c => set(s=>({categories:c.id?s.categories.map(x=>x.id===c.id?{...c,id:c.id}:x):[...s.categories,{...c,id:crypto.randomUUID()}]})),
 deleteCategory:id=>set(s=>({categories:s.categories.filter(c=>c.id!==id)})),
 saveBudget:b=>set(s=>{const next={...s,budgets:b.id?s.budgets.map(x=>x.id===b.id?{...b,id:b.id}:x):[...s.budgets,{...b,id:crypto.randomUUID()}]};return withAlerts(next)}),
 deleteBudget:id=>set(s=>({budgets:s.budgets.filter(b=>b.id!==id)})), markAllRead:()=>set(s=>({alerts:s.alerts.map(a=>({...a,read:true}))})), clearAlerts:()=>set({alerts:[]}), updateSettings:s=>set(x=>({settings:{...x.settings,...s}})), replaceData:d=>set(d), erase:()=>set({...initial,categories:defaultCategories()})
}), { name:'expense-tracker-data', storage:createJSONStorage(()=>safeStorage), version:1, migrate:(persisted)=>persisted as Store }))
