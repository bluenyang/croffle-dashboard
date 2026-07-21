/** Directus 태그 slug와 맞추기 위한 정규화 */
export function toTagSlug(name: string): string {
  return name
    .trim()
    .toLowerCase() // 소문자 변환
    .normalize('NFC') // 정규화
    .replace(/\s+/g, '-') // 공백 -> '-'
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // 문자/숫자/공백/'-' 외 제거
    .replace(/-+/g, '-') // 연속 '-' 축약
    .replace(/^-+|-+$/g, ''); // 앞뒤 '-' 제거
}
