import Vue from 'vue'
import Router from 'vue-router'

const Login = ()=> import('../views/login')
const Main = ()=> import('../components/Main')
const home = ()=> import('../views/home/index')
const test = ()=> import('../views/test/index')
const student = ()=> import('../views/user/index')
const stuMain = ()=> import('../components/stuMain')
const stuHome = ()=> import('../views/stu/index')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    component: Main,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: home
      },
      {
        path: 'test',
        name: 'test',
        component: test
      },
      {
        path: 'student',
        name: 'student',
        component: student
      }
    ]
  },
  {
    path: '/stuMain',
    component: stuMain,
    children: [
      {
        path: '',
        component: stuHome
      }
    ]
  }
 
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.path === '/login') return next()
  //获取用户页面token信息
  let token = window.sessionStorage.getItem('token')
  //如果token数据为null则跳转到指定路径
  if (!token) router.push('login')
  next()
})
export default router
