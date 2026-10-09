<script setup>
import { useShop } from '../stores/shop'
import { money } from '../utils'
const shop = useShop()
</script>

<template>
  <h1 class="page-title">cart</h1>
  <p v-if="!shop.lines.length" class="empty">your cart is empty. <RouterLink to="/#featured">browse books</RouterLink></p>
  <section v-else class="panel">
    <div v-for="{ book, qty } in shop.lines" :key="book.id" class="row-item">
      <img :src="book.img" :alt="book.title">
      <div class="info"><h3>{{ book.title }}</h3><span>{{ money(book.price) }}</span></div>
      <div class="qty">
        <button @click="shop.setQty(book.id, qty - 1)" aria-label="less">−</button>
        <b>{{ qty }}</b>
        <button @click="shop.setQty(book.id, qty + 1)" aria-label="more">+</button>
      </div>
      <b>{{ money(book.price * qty) }}</b>
      <button class="x" @click="shop.setQty(book.id, 0)" aria-label="remove"><i class="fas fa-trash"></i></button>
    </div>
    <div class="total"><b>total: {{ money(shop.total) }}</b><RouterLink to="/checkout" class="btn">checkout</RouterLink></div>
  </section>
</template>
