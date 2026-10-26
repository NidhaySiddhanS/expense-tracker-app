export const parseMoney = (input: string): number | null => {
  const clean = input.replace(/,/g, '').trim()
  if (!/^\d+(\.\d{1,2})?$/.test(clean)) return null
  const [whole, fraction = ''] = clean.split('.')
  const value = Number(whole) * 100 + Number((fraction + '00').slice(0, 2))
  return Number.isSafeInteger(value) ? value : null
}
export const formatMoney = (paise: number, currency = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency, minimumFractionDigits: 2 }).format(paise / 100)
