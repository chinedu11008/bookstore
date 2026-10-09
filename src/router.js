import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue'), meta: { title: 'Home' } },
    { path: '/cart', component: () => import('./views/CartView.vue'), meta: { title: 'Cart' } },
    { path: '/favourites', component: () => import('./views/FavouritesView.vue'), meta: { title: 'Favourites' } },
    { path: '/checkout', component: () => import('./views/CheckoutView.vue'), meta: { title: 'Checkout' } },
    { path: '/account', component: () => import('./views/AccountView.vue'), meta: { title: 'Account' } },
    { path: '/:rest(.*)*', redirect: '/' }
  ],
  scrollBehavior: (to, from, saved) => (to.hash ? { el: to.hash, behavior: 'smooth' } : saved || { top: 0 })
})
router.afterEach(t => { document.title = 'Read-A-Lot | ' + (t.meta.title || '') })
export default router
