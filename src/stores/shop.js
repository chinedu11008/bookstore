import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { byId } from '../data/books'

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export const useShop = defineStore('shop', () => {
  const cart = ref(load('ral-cart', {}))
  const favs = ref(load('ral-favs', []))
  const user = ref(load('ral-user', null))

  watch([cart, favs, user], () => {
    try {
      localStorage.setItem('ral-cart', JSON.stringify(cart.value))
      localStorage.setItem('ral-favs', JSON.stringify(favs.value))
      localStorage.setItem('ral-user', JSON.stringify(user.value))
    } catch { /* storage unavailable */ }
  }, { deep: true })

  const lines = computed(() => Object.entries(cart.value).filter(([id]) => byId[id]).map(([id, qty]) => ({ book: byId[id], qty })))
  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
  const total = computed(() => lines.value.reduce((n, l) => n + l.qty * l.book.price, 0))
  const favBooks = computed(() => favs.value.map(id => byId[id]).filter(Boolean))

  const add = id => { cart.value[id] = Math.min((cart.value[id] || 0) + 1, 99) }
  const setQty = (id, q) => { if (q > 0) cart.value[id] = Math.min(q, 99); else delete cart.value[id] }
  const clear = () => { cart.value = {} }
  const isFav = id => favs.value.includes(id)
  const toggleFav = id => { favs.value = isFav(id) ? favs.value.filter(x => x !== id) : [...favs.value, id] }
  const signIn = u => { user.value = { ...user.value, ...u } }
  const signOut = () => { user.value = null }

  return { cart, favs, user, lines, count, total, favBooks, add, setQty, clear, isFav, toggleFav, signIn, signOut }
})
