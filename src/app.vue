<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterView, useRoute } from 'vue-router';

  import DefaultLayout from '@/layout/default-layout.vue';
  import NoneLayout from '@/layout/none-layout.vue';

  const route = useRoute();

  const layouts: Record<string, unknown> = {
    default: DefaultLayout,
    none: NoneLayout,
  };

  const currentLayout = computed(() => {
    const layoutName = (route.meta.layout as string) || 'none';
    return layouts[layoutName] || layouts.default;
  });
</script>

<template>
  <UApp>
    <component :is="currentLayout">
      <RouterView />
    </component>
  </UApp>
</template>
