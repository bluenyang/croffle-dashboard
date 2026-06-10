// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/features/auth/auth.store';
import AuthCallbackView from '@/pages/auth-collback-view.vue';
import DashboardView from '@/pages/dashboard-view.vue';
import ErrorView from '@/pages/error-view.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/callback',
      name: 'callback',
      component: AuthCallbackView,
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  if (!auth.isAuthReady) await auth.initAuth();

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    auth.login();
    return false;
  }
});

export default router;
