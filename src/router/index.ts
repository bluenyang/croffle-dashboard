// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/features/auth/auth.store';
import AuthCallbackView from '@/pages/auth-callback-view.vue';
import DashboardView from '@/pages/dashboard-view.vue';
import ErrorView from '@/pages/error-view.vue';
import ProfileView from '@/pages/profile-view.vue';
import { useProfileStore } from '@/features/profile/profile.store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/callback',
      name: 'callback',
      component: AuthCallbackView,
      meta: { layout: 'none' },
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
      meta: { layout: 'default' },
    },
  ],
});

router.beforeEach(async (to) => {
  const { isAuthReady, isLoggedIn, initAuth, login } = useAuthStore();
  const { hasProfile, fetchProfile } = useProfileStore();

  if (to.name === 'callback') return true;

  if (!isAuthReady) {
    await initAuth();
  }

  if (!hasProfile) {
    await fetchProfile();
  }
  if (to.meta.requiresAuth && !isLoggedIn) {
    login();
    return false;
  }
});

export default router;
