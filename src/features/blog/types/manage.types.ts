export type ManageSection =
  | 'settings'
  | 'posts'
  | 'categories'
  | 'navigation'
  | 'content'
  | 'stats';

export const MANAGE_SECTIONS: ManageSection[] = [
  'settings',
  'posts',
  'categories',
  'navigation',
  'content',
  'stats',
];

export function isManageSection(value: unknown): value is ManageSection {
  return typeof value === 'string' && MANAGE_SECTIONS.includes(value as ManageSection);
}
