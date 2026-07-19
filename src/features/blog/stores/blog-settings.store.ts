import { directus } from '@/util/directus';
import { createItem, readItems, updateItem } from '@directus/sdk';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import { mapBlogSettings, mapBlogSettingsToPayload } from '../mappers/blog-settings.mapper';
import type { DirectusBlogSettings } from '../types/directus.types';
import type { BlogSettings, BlogSettingsSaveRequest } from '../types/blog-settings.types';

export const useBlogSettingsStore = defineStore('blog_settings', () => {
  const settings = ref<BlogSettings | null>(null);
  const isLoading = ref(false);
  const isSaving = ref(false);
  const err = ref<string | null>(null);

  async function fetchSettings(blogId: string) {
    isLoading.value = true;
    err.value = null;
    settings.value = null;
    try {
      const resp = await directus.request<DirectusBlogSettings[]>(
        readItems('blog_settings', {
          filter: { blog_id: { _eq: blogId } },
          limit: 1,
          _ts: Date.now(),
        }),
      );
      settings.value = resp[0] ? mapBlogSettings(resp[0]) : null;
    } catch {
      err.value = '콘텐츠 설정을 불러오는데 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  }

  async function saveSettings(req: BlogSettingsSaveRequest): Promise<boolean> {
    isSaving.value = true;
    err.value = null;
    try {
      const payload = mapBlogSettingsToPayload(req);
      if (settings.value) {
        const resp = await directus.request<DirectusBlogSettings>(
          updateItem('blog_settings', settings.value.id, payload),
        );
        settings.value = mapBlogSettings(resp);
      } else {
        const resp = await directus.request<DirectusBlogSettings>(
          createItem('blog_settings', payload),
        );
        settings.value = mapBlogSettings(resp);
      }
      return true;
    } catch {
      err.value = '콘텐츠 설정 저장에 실패했습니다.';
      return false;
    } finally {
      isSaving.value = false;
    }
  }

  return {
    settings,
    isLoading,
    isSaving,
    err,
    fetchSettings,
    saveSettings,
  };
});
