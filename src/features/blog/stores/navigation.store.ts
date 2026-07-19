import { directus } from '@/util/directus';
import { createItem, deleteItem, readItems, updateItem } from '@directus/sdk';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import {
  buildNavigationTree,
  mapNavigation,
  mapNavigationToPayload,
} from '../mappers/navigation.mapper';
import type { DirectusNavigation } from '../types/directus.types';
import type { Navigation, NavigationSaveRequest } from '../types/navigation.type';

export const useNavigationStore = defineStore('blog_navigation', () => {
  const items = ref<Navigation[]>([]);
  const tree = ref<Navigation[]>([]);
  const isLoading = ref(false);
  const isSaving = ref(false);
  const err = ref<string | null>(null);

  async function fetchNavigation(blogId: string) {
    isLoading.value = true;
    err.value = null;
    try {
      const resp = await directus.request<DirectusNavigation[]>(
        readItems('navigations', {
          filter: { blog_id: { _eq: blogId } },
          sort: ['sort_order', 'label'],
          _ts: Date.now(),
        }),
      );
      items.value = resp.map(mapNavigation);
      tree.value = buildNavigationTree(items.value);
    } catch {
      err.value = '네비게이션을 불러오는데 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  }

  async function createNavigation(req: NavigationSaveRequest): Promise<Navigation | null> {
    isSaving.value = true;
    err.value = null;
    try {
      const resp = await directus.request<DirectusNavigation>(
        createItem('navigations', mapNavigationToPayload(req)),
      );
      const created = mapNavigation(resp);
      items.value.push(created);
      tree.value = buildNavigationTree(items.value);
      return created;
    } catch {
      err.value = '네비게이션 생성에 실패했습니다.';
      return null;
    } finally {
      isSaving.value = false;
    }
  }

  async function updateNavigation(
    id: string,
    req: Partial<NavigationSaveRequest>,
  ): Promise<boolean> {
    isSaving.value = true;
    err.value = null;
    try {
      const payload: Partial<ReturnType<typeof mapNavigationToPayload>> = {};
      if (req.label !== undefined) payload.label = req.label;
      if (req.url !== undefined) payload.url = req.url;
      if (req.icon !== undefined) payload.icon = req.icon;
      if (req.isCategory !== undefined) payload.is_category = req.isCategory;
      if (req.parentId !== undefined) payload.parent_id = req.parentId;
      if (req.sortOrder !== undefined) payload.sort_order = req.sortOrder;

      const resp = await directus.request<DirectusNavigation>(
        updateItem('navigations', id, payload),
      );
      const updated = mapNavigation(resp);
      const idx = items.value.findIndex((n) => n.id === id);
      if (idx !== -1) items.value[idx] = updated;
      tree.value = buildNavigationTree(items.value);
      return true;
    } catch {
      err.value = '네비게이션 수정에 실패했습니다.';
      return false;
    } finally {
      isSaving.value = false;
    }
  }

  async function deleteNavigation(id: string): Promise<boolean> {
    isSaving.value = true;
    err.value = null;
    try {
      await directus.request(deleteItem('navigations', id));
      items.value = items.value.filter((n) => n.id !== id);
      tree.value = buildNavigationTree(items.value);
      return true;
    } catch {
      err.value = '네비게이션 삭제에 실패했습니다.';
      return false;
    } finally {
      isSaving.value = false;
    }
  }

  return {
    items,
    tree,
    isLoading,
    isSaving,
    err,
    fetchNavigation,
    createNavigation,
    updateNavigation,
    deleteNavigation,
  };
});
