import VueRouter from 'vue-router'
import Home from './components/Home'
import Login from './components/Login'
import store from './store'

const routes = [
  { path: '/home', name: 'home', component: Home },
  { path: '/', name: 'login', component: Login },
  { path: '*', component: Home }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

const validateLoginRouter = to => {
  let match = store.state.user.hash === router.app.$session.get('jwt')
  if (to.path !== '/' && !match) {
    return 'login'
  } else if (to.path === '/' && match) {
    return 'home'
  }
}

router.beforeEach((to, from, next) => {
  next({ name: validateLoginRouter(to) })

  next()
})

export default router
