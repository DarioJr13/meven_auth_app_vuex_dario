import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

Vue.use(VueRouter)

 /* const routes = [
]*/


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresGuest: true,
        //requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue'),
      meta: {
        requiresGuest: true,
        //requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( '../views/Login.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isLoggedIn) {
      //Redirect to the Login Page
      next('/login');
    } else {
      next();
    }
  }
  else if(to.matched.some(record => record.meta.requiresGuest)){
    if(store.getters.isLoggedIn) {
      //Redirect to the Login Page
      next('/profile');
    } else {
      next()
    } 
  }
});


export default router;