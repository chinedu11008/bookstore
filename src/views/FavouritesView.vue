<script setup>
import { useShop } from '../stores/shop'
import BookCard from '../components/BookCard.vue'
const shop = useShop()
</script>

<template>
  <h1 class="page-title">favourites</h1>
  <p v-if="!shop.favBooks.length" class="empty">no favourites yet. tap the heart on any book. <RouterLink to="/#featured">browse books</RouterLink></p>
  <section v-else class="featured">
    <div class="featured-slider"><BookCard v-for="b in shop.favBooks" :key="b.id" :book="b" /></div>
  </section>
</template>
