import { describe, expect, it } from 'vitest'
import { budgetStatus } from './budgets'
const b={id:'b',month:'2026-10',categoryId:null,limitPaise:10000}; const tx=(amountPaise:number)=>({id:'t',type:'expense' as const,amountPaise,date:'2026-10-01',categoryId:'x',note:'',createdAt:''})
describe('budget status',()=>{it('handles threshold boundaries',()=>{expect(budgetStatus(b,[tx(7999)]).percent).toBe(80);expect(budgetStatus(b,[tx(10000)]).remaining).toBe(0)});it('ignores income and other month',()=>expect(budgetStatus(b,[{...tx(5000),type:'income'},{...tx(5000),date:'2026-09-01'}]).spent).toBe(0));it('handles zero limits',()=>expect(budgetStatus({...b,limitPaise:0},[tx(1)]).percent).toBe(100))})
