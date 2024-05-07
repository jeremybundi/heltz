import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddItems from '../views/AddItems.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
import ShowOrders from '../views/ShowOrders.vue'
import Dashboard from '../views/Dashboard.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/additems',
    name: 'additems',
    component: AddItems
  },
  {
    path: '/signUp',
    name: '/signUp',
    component: SignUp
  },
  {
    path: '/login',
    name: '/login',
    component: Login
  },
  {
    path: '/orders',
    name: '/orders',
    component: Orders
  },
  {
    path: '/show',
    name: '/show',
    component: ShowOrders
  },
  {
    path: '/dashboard',
    name: '/dashboard',
    component: Dashboard
  },
 
]

const router = new VueRouter({routes})

export default router
