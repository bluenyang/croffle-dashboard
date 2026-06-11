<script setup lang="ts">
  import Header from '@/components/header.vue';
</script>

<template>
  <Header />
  <UMain class="min-h-screen">
    <slot />
  </UMain>
</template>
