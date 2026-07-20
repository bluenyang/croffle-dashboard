/** Directus 태그 slug와 맞추기 위한 정규화 */
export function toTagSlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFC')
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
