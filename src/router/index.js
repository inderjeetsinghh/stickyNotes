import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      meta: { hideNavigation: true }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
      meta: { hideNavigation: true }
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue'),
      meta: { hideNavigation: true }
    },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next){
       let currentUser = JSON.parse(localStorage.getItem('savedUser'));
       if(currentUser && currentUser.name){
          next();
       }
       else{
         next("/login")
       }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/hello',
    name: 'hello',
    component: () => import(/* webpackChunkName: "about" */ '../views/Hello.vue')
  },
  {
    path: '/singlenote',
    name: 'singlenote',
    component: () => import(/* webpackChunkName: "about" */ '../views/SingleNote.vue'),
    beforeEnter(to, from, next){
      let currentUser = JSON.parse(localStorage.getItem('savedUser'));
      if(currentUser && currentUser.name){
         next();
      }
      else{
        next("/login")
      }
   }
  }
]

const router = new VueRouter({
  routes
})

export default router
