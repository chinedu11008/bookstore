<script setup>
import { reactive, ref } from 'vue'
import { useShop } from '../stores/shop'
import { fields } from '../utils'

const shop = useShop()
const f = reactive({ name: '', email: '', phone: '', address: '', city: '', state: '', country: '', ...shop.user })
const saved = ref(false)
function save() {
  shop.signIn({ ...f })
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}
</script>

<template>
  <h1 class="page-title">my account</h1>
  <form class="panel form" @submit.prevent="save">
    <label v-for="[k, l, t] in fields" :key="k">{{ l }}<input v-model="f[k]" :type="t || 'text'" :required="k === 'name'"></label>
    <div><button class="btn">save changes</button> <span v-if="saved">saved ✓</span></div>
  </form>
</template>
