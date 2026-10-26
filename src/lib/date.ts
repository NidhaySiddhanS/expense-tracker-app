import { format, parseISO } from 'date-fns'
export const today = () => format(new Date(), 'yyyy-MM-dd')
export const monthKey = (date = new Date()) => format(date, 'yyyy-MM')
export const dateMonth = (date: string) => date.slice(0, 7)
export const monthLabel = (month: string) => format(parseISO(`${month}-01`), 'MMMM yyyy')
