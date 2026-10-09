export const currency = import.meta.env.VITE_CURRENCY || 'USD'
const fmt = new Intl.NumberFormat('en', { style: 'currency', currency })
export const money = n => fmt.format(n)
export const fields = [['name', 'full name'], ['email', 'email', 'email'], ['phone', 'phone', 'tel'], ['address', 'address'], ['city', 'city'], ['state', 'state'], ['country', 'country']]
