import Vue from 'vue'
import VueRouter from 'vue-router'
import Books from '@/components/Books.vue'
import Words from '@/components/Words.vue'
import Singin from '@/components/Signin.vue'
import Singup from '@/components/Signup.vue'
import Profile from '@/components/Profile.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/words',
      name: 'words',
      component: Words
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'signin',
      component: Singin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Singup
    },
  
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
