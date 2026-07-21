import { directus } from '@/util/directus';
import { readItems, updateItem } from '@directus/sdk';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { mapBlogMember } from '../mappers/blog.mapper';
import type { DirectusBlogMember } from '../types/directus.types';
import type { Blog, BlogMember } from '../types/blog.types';

export const useBlogStore = defineStore('blogs', () => {
  const members = ref<BlogMember[]>([]);
  const isLoading = ref(false);
  const err = ref<string | null>(null);

  const myBlogs = computed<Blog[]>(() => members.value.map((m) => m.blog));

  function getBlogBySlug(slug: string): Blog | undefined {
    return myBlogs.value.find((b) => b.slug === slug);
  }

  function getMemberBySlug(slug: string): BlogMember | undefined {
    return members.value.find((m) => m.blog.slug === slug);
  }

  async function fetchMyBlogs() {
    isLoading.value = true;
    err.value = null;

    try {
      const resp = await directus.request<DirectusBlogMember[]>(
        readItems('blog_members', {
          filter: { user_id: { _eq: '$CURRENT_USER' } },
          fields: ['id', 'role', 'user_id', 'blog_id.*'],
        }),
      );
      members.value = resp.map(mapBlogMember);
    } catch {
      members.value = [];
      err.value = '블로그 목록을 불러오는데 실패했습니다.';
    } finally {
      isLoading.value = false;
    }
  }

  async function updateBlog(
    blogId: string,
    data: { name?: string; description?: string },
  ): Promise<boolean> {
    err.value = null;
    try {
      const payload: { name?: string; description?: string } = {};
      if (data.name !== undefined) payload.name = data.name;
      if (data.description !== undefined) payload.description = data.description;

      await directus.request(updateItem('blog', blogId, payload));
      const member = members.value.find((m) => m.blog.id === blogId);
      if (member) {
        if (data.name !== undefined) member.blog.name = data.name;
        if (data.description !== undefined) member.blog.description = data.description;
      }
      return true;
    } catch {
      err.value = '블로그 정보 수정에 실패했습니다.';
      return false;
    }
  }

  return {
    members,
    myBlogs,
    isLoading,
    err,
    getBlogBySlug,
    getMemberBySlug,
    fetchMyBlogs,
    updateBlog,
  };
});
