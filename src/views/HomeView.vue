<script setup>
import { featured, arrivals } from '../data/books'
import BookCard from '../components/BookCard.vue'
import HeroSection from '../components/HeroSection.vue'
import IconsSection from '../components/IconsSection.vue'
import DealSection from '../components/DealSection.vue'
import ReviewsSection from '../components/ReviewsSection.vue'
import BlogsSection from '../components/BlogsSection.vue'
</script>

<template>
  <HeroSection />
  <IconsSection />
  <section class="featured" id="featured">
    <h1 class="heading"><span>featured books</span></h1>
    <div class="featured-slider">
      <BookCard v-for="b in featured" :key="b.id" :book="b" />
    </div>
  </section>
  <section class="arrivals" id="arrivals">
    <h1 class="heading"><span>new arrivals</span></h1>
    <div class="arrivals-slider"><div class="wrapper">
      <BookCard v-for="b in arrivals" :key="b.id" :book="b" stars />
    </div></div>
  </section>
  <DealSection />
  <ReviewsSection />
  <BlogsSection />
</template>
