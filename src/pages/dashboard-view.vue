<script setup lang="ts">
  import { onMounted } from 'vue';

  import { getMe } from '@/util/directus';

  onMounted(async () => {
    const me = await getMe();
    console.log(me);
  });
</script>

<template>
  <div></div>
</template>
