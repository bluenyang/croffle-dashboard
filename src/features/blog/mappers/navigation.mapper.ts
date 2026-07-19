import type { DirectusNavigation, DirectusNavigationSavePayload } from '../types/directus.types';
import type { Navigation, NavigationSaveRequest } from '../types/navigation.type';

export function mapNavigation(raw: DirectusNavigation): Navigation {
  return {
    id: raw.id,
    blogId: raw.blog_id,
    label: raw.label,
    url: raw.url,
    icon: raw.icon,
    isCategory: raw.is_category,
    parentId: raw.parent_id,
    sortOrder: raw.sort_order,
  };
}

export function mapNavigationToPayload(req: NavigationSaveRequest): DirectusNavigationSavePayload {
  return {
    blog_id: req.blogId,
    label: req.label,
    url: req.url ?? null,
    icon: req.icon ?? null,
    is_category: req.isCategory ?? false,
    parent_id: req.parentId ?? null,
    sort_order: req.sortOrder ?? 0,
  };
}

export function buildNavigationTree(items: Navigation[]): Navigation[] {
  const map = new Map<string, Navigation>();
  const roots: Navigation[] = [];

  items.forEach((item) => map.set(item.id, { ...item, children: [] }));

  map.forEach((item) => {
    if (item.parentId && map.has(item.parentId)) {
      map.get(item.parentId)!.children!.push(item);
    } else {
      roots.push(item);
    }
  });

  return roots.sort((a, b) => a.sortOrder - b.sortOrder);
}
