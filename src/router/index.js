import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Shop from '../views/Shop.vue'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: Shop,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    props: true,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import('../views/PersonPage.vue'),
    props: true,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/products',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue')
      },
      {
        path: 'product/:id',
        name: 'AdminProduct',
        component: () => import('../views/admin/AdminProduct.vue'),
        props: true
      },
      {
        path: 'categories',
        component: () => import('../views/admin/AdminCategories.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue')
      }
    ],
    meta: {
      layout: 'admin',
      role: true,
      auth: true
    }
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      layout: 'auth'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // eslint-disable-line
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const role = to.meta.role
  if (role && store.getters['auth/isAdmin'] && store.getters['auth/isAuthenticated']) {
    next()
  } else if (role && !store.getters['auth/isAdmin'] && requireAuth && store.getters['auth/isAuthenticated']) {
    next('/auth?message=notAdmin')
  } else if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/')
  } else {
    next()
  }
})

export default router
