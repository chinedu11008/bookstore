<script setup>
import { reactive, ref } from 'vue'
import { useShop } from '../stores/shop'
import { money, currency, fields } from '../utils'
import { pay, demoMode } from '../payments'

const shop = useShop()
const f = reactive({ name: '', email: '', phone: '', address: '', city: '', state: '', country: '', ...shop.user })
const busy = ref(false), msg = ref(''), order = ref(null)

async function submit() {
  if (!shop.lines.length) return
  busy.value = true; msg.value = ''
  try {
    const total = shop.total
    const r = await pay({ amount: Number(total.toFixed(2)), currency, email: f.email, name: f.name, phone: f.phone })
    if (['successful', 'completed', 'demo'].includes(r.status)) {
      shop.signIn({ ...f })
      order.value = { ref: r.ref, total, demo: r.status === 'demo' }
      shop.clear()
    } else msg.value = r.status === 'cancelled' ? 'payment cancelled' : 'payment failed, please try again'
  } catch (e) { msg.value = e.message }
  busy.value = false
}
</script>

<template>
  <h1 class="page-title">checkout</h1>
  <div v-if="order" class="panel empty">
    <h2>thank you for your order!</h2>
    <p>reference: {{ order.ref }} · {{ money(order.total) }}</p>
    <p v-if="order.demo" class="note">demo mode: no payment was taken.</p><br>
    <RouterLink to="/" class="btn">keep shopping</RouterLink>
  </div>
  <p v-else-if="!shop.lines.length" class="empty">your cart is empty. <RouterLink to="/#featured">browse books</RouterLink></p>
  <div v-else class="checkout">
    <form class="panel form" @submit.prevent="submit">
      <h3>billing &amp; shipping details</h3>
      <label v-for="[k, l, t] in fields" :key="k">{{ l }}<input v-model="f[k]" :type="t || 'text'" required></label>
      <p v-if="demoMode" class="note">demo mode: no payment is taken. set VITE_FLW_PUBLIC_KEY to enable card payments.</p>
      <p v-if="msg" class="err">{{ msg }}</p>
      <button class="btn" :disabled="busy">{{ busy ? 'processing…' : 'pay ' + money(shop.total) }}</button>
    </form>
    <div class="panel">
      <h3>order summary</h3>
      <p v-for="{ book, qty } in shop.lines" :key="book.id" class="row-item"><span class="info">{{ book.title }} × {{ qty }}</span><b>{{ money(book.price * qty) }}</b></p>
      <div class="total"><b>total</b><b>{{ money(shop.total) }}</b></div>
    </div>
  </div>
</template>
