<script setup>
import { ref } from 'vue'
import { useShop } from '../stores/shop'
import { money } from '../utils'

const props = defineProps({ book: Object, stars: Boolean })
const shop = useShop()
const added = ref(false)
function add() {
  shop.add(props.book.id)
  added.value = true
  setTimeout(() => (added.value = false), 1200)
}
</script>

<template>
  <div class="slide box">
    <div class="icons">
      <a href="#" class="fas fa-heart" aria-label="favourite" :style="shop.isFav(book.id) ? 'background:var(--green);color:#fff' : ''" @click.prevent="shop.toggleFav(book.id)"></a>
    </div>
    <div class="image"><img :src="book.img" :alt="book.title"></div>
    <div class="content">
      <h3>{{ book.title }}</h3>
      <div class="price">{{ money(book.price) }} <span>{{ money(book.old) }}</span></div>
      <div v-if="stars" class="stars">
        <i v-for="n in 4" :key="n" class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
      </div>
      <a href="#" class="btn" @click.prevent="add">{{ added ? 'added ✓' : 'add to cart' }}</a>
    </div>
  </div>
</template>
