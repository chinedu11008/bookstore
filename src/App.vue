<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useShop } from './stores/shop'
import AppFooter from './components/AppFooter.vue'

const shop = useShop()
const router = useRouter()
const nav = ['home', 'featured', 'arrivals', 'reviews', 'blogs']
const icons = ['home', 'list', 'tags', 'comments', 'blog']
const searchOpen = ref(false), loginOpen = ref(false), scrolled = ref(false), ready = ref(false)
const q = ref(''), results = ref(null), busy = ref(false), err = ref(''), name = ref('')
const KEY = import.meta.env.VITE_BOOKS_KEY

async function search() {
  const term = q.value.trim()
  if (!term) return
  busy.value = true; err.value = ''; results.value = null
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=12&q=${encodeURIComponent(term)}${KEY ? `&key=${KEY}` : ''}`)
    if (!res.ok) throw new Error('bad status')
    const data = await res.json()
    results.value = (data.items || [])
      .map(i => ({ id: i.id, title: i.volumeInfo?.title || '', link: i.volumeInfo?.infoLink, img: (i.volumeInfo?.imageLinks?.thumbnail || '').replace('http:', 'https:') }))
      .filter(b => b.img)
  } catch {
    err.value = 'search is unavailable right now, please try again'
  }
  busy.value = false
}
const closeSearch = () => { results.value = null; err.value = '' }
const signIn = () => { if (name.value.trim()) { shop.signIn({ name: name.value.trim() }); name.value = '' } }
const signOut = () => { shop.signOut(); loginOpen.value = false }

// internal <a href="/..."> links inside static sections navigate without a page reload
function go(e) {
  if (e.defaultPrevented) return
  const a = e.target.closest('a[href^="/"]')
  if (a && !a.target && !e.metaKey && !e.ctrlKey) { e.preventDefault(); router.push(a.getAttribute('href')); loginOpen.value = false }
}
const onScroll = () => { scrolled.value = scrollY > 80; searchOpen.value = false }
onMounted(() => { onScroll(); addEventListener('scroll', onScroll); setTimeout(() => (ready.value = true), 800) })
onUnmounted(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <div @click="go">
    <header class="header">
      <div class="header-1">
        <RouterLink to="/" class="logo"><i class="fas fa-book"></i>Read-A-Lot</RouterLink>
        <form class="search-form" :class="{ active: searchOpen }" @submit.prevent="search">
          <input v-model="q" type="search" placeholder="search here..." id="search-box">
          <label for="search-box" class="fas fa-search"></label>
        </form>
        <div class="icons">
          <div id="search-btn" class="fas fa-search" @click="searchOpen = !searchOpen"></div>
          <RouterLink to="/favourites" class="fas fa-heart" aria-label="favourites"></RouterLink>
          <RouterLink to="/cart" class="fas fa-shopping-cart" aria-label="cart"></RouterLink>
          <div id="login-btn" class="fas fa-user" @click="loginOpen = !loginOpen"></div>
        </div>
      </div>
      <div class="header-2" :class="{ active: scrolled }">
        <nav class="navbar">
          <RouterLink v-for="n in nav" :key="n" :to="`/#${n}`">{{ n }}</RouterLink>
          <RouterLink to="/checkout">checkout</RouterLink>
        </nav>
      </div>
    </header>

    <div v-if="busy || err || results" class="search-results">
      <div>
        <h3>Search Results <i class="fas fa-times" @click="closeSearch"></i></h3>
        <p v-if="busy">searching…</p>
        <p v-else-if="err" class="err">{{ err }}</p>
        <p v-else-if="!results.length">no books found</p>
        <a v-for="b in results" :key="b.id" :href="b.link" target="_blank" rel="noopener"><img :src="b.img" :alt="b.title" :title="b.title"></a>
      </div>
    </div>

    <nav class="bottom-navbar">
      <RouterLink v-for="(n, i) in nav" :key="n" :to="`/#${n}`" :class="`fas fa-${icons[i]}`" :aria-label="n"></RouterLink>
    </nav>

    <div class="login-form-container" :class="{ active: loginOpen }">
      <div id="close-login-btn" class="fas fa-times" @click="loginOpen = false"></div>
      <form @submit.prevent="signIn">
        <img src="/image/scorpion.jpg" alt="Avatar" class="avatar"><br><br>
        <template v-if="shop.user?.name">
          <h1 style="text-align:center;">welcome {{ shop.user.name }}</h1><br>
          <RouterLink to="/account" style="text-align:center;" @click="loginOpen = false"><p>manage account</p></RouterLink><br>
          <a href="#" style="text-align:center;" @click.prevent="signOut"><p>sign out</p></a>
        </template>
        <template v-else>
          <h1 style="text-align:center;">welcome</h1>
          <input v-model="name" placeholder="your name" style="width:100%;padding:1rem;margin:1rem 0;font-size:1.6rem;border:var(--border);text-transform:none;">
          <button class="btn" style="width:100%;">sign in</button>
        </template>
      </form>
    </div>

    <RouterView />
    <AppFooter />
    <div class="loader-container" :class="{ active: ready }"><img src="/image/loader-img.gif" alt=""></div>
  </div>
</template>
