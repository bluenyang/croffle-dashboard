<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import { useAuthStore } from '@/features/auth/auth.store';

  const router = useRouter();
  const auth = useAuthStore();

  onMounted(async () => {
    const redirectUrl = sessionStorage.getItem('redirect_url');
    try {
      await auth.handleCallback();
      sessionStorage.removeItem('redirect_url');
      router.replace(redirectUrl || '/');
    } catch (err) {
      console.error(err);
      router.replace('/error');
    }
  });
</script>

<template>
  <div></div>
</template>
