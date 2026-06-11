<script setup lang="ts">
  import { RouterView } from 'vue-router';

  import DefaultLayout from '@/layout/default-layout.vue';
</script>

<template>
  <UApp>
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </UApp>
</template>
