<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { ref, watch } from 'vue';

  import { usePostStore } from '@/features/blog/stores/post.store';
  import type { FolderImage } from '@/features/blog/types/post.types';
  import { FOLDER_IMAGES_PAGE_SIZE } from '@/features/blog/types/post.types';

  const props = defineProps<{
    open: boolean;
    blogSlug: string;
    selectedId?: string | null;
  }>();

  const emit = defineEmits<{
    'update:open': [value: boolean];
    select: [fileId: string];
  }>();

  const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL as string;

  const postStore = usePostStore();
  const { err } = storeToRefs(postStore);
  const { fetchFolderImages } = postStore;

  const items = ref<FolderImage[]>([]);
  const total = ref(0);
  const page = ref(1);
  const isLoading = ref(false);

  function assetUrl(id: string) {
    return `${DIRECTUS_URL}/assets/${id}?width=200&height=200&fit=cover&format=webp&quality=30`;
  }

  async function loadPage(nextPage: number) {
    isLoading.value = true;
    page.value = nextPage;
    const result = await fetchFolderImages(props.blogSlug, nextPage);
    items.value = result.items;
    total.value = result.total;
    isLoading.value = false;
  }

  watch(
    () => props.open,
    (open) => {
      if (open) void loadPage(1);
    },
  );

  function handleSelect(fileId: string) {
    emit('select', fileId);
    emit('update:open', false);
  }

  function close() {
    emit('update:open', false);
  }
</script>

<template>
  <UModal
    :open="open"
    title="이미지 선택"
    description="블로그 폴더에 있는 이미지를 선택하세요."
    :ui="{ content: 'sm:max-w-4xl sm:max-h-200 bg-background z-50' }"
    @update:open="emit('update:open', $event)"
  >
    <template #body>
      <div class="min-h-64 space-y-4">
        <div v-if="isLoading" class="flex justify-center py-16">
          <UIcon name="i-lucide-loader-circle" class="text-muted size-8 animate-spin" />
        </div>

        <UAlert
          v-else-if="err"
          color="error"
          variant="soft"
          :description="err"
          icon="i-lucide-triangle-alert"
        />

        <div v-else-if="items.length === 0" class="text-muted py-16 text-center text-sm">
          {{ '선택한 폴더에 이미지가 없습니다.' }}
        </div>

        <div v-else class="grid grid-cols-3 gap-3 sm:grid-cols-5">
          <button
            v-for="file in items"
            :key="file.id"
            type="button"
            class="border-default hover:border-primary focus-visible:ring-primary relative aspect-square overflow-hidden rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none"
            :class="selectedId === file.id ? 'border-primary ring-primary ring-2' : ''"
            @click="handleSelect(file.id)"
          >
            <img
              :src="assetUrl(file.id)"
              :alt="file.title || file.filenameDownload"
              class="size-full object-cover"
            />
          </button>
        </div>

        <div v-if="total > FOLDER_IMAGES_PAGE_SIZE" class="flex justify-center pt-2">
          <UPagination
            :page="page"
            :total="total"
            :items-per-page="FOLDER_IMAGES_PAGE_SIZE"
            @update:page="loadPage"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton color="neutral" variant="ghost" @click="close">닫기</UButton>
      </div>
    </template>
  </UModal>
</template>
