// lib/directus.ts
import { createDirectus, rest, authentication, readMe } from '@directus/sdk';

const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL;

export const directus = createDirectus(DIRECTUS_URL)
  .with(authentication('cookie', { credentials: 'include' })) // cookie mode
  .with(rest({ credentials: 'include' }));

export async function getMe() {
  try {
    return await directus.request(readMe({ fields: ['id', 'email'] }));
  } catch {
    return null;
  }
}
