import type {
  DirectusBlogSettings,
  DirectusBlogSettingsSavePayload,
} from '../types/directus.types';
import type { BlogSettings, BlogSettingsSaveRequest } from '../types/blog-settings.types';

export function mapBlogSettings(raw: DirectusBlogSettings): BlogSettings {
  return {
    id: raw.id,
    blogId: raw.blog_id,
    allowCcl: raw.allow_ccl,
    allowCommercial: raw.allow_commercial,
    changeContent: raw.change_content,
  };
}

export function mapBlogSettingsToPayload(
  req: BlogSettingsSaveRequest,
): DirectusBlogSettingsSavePayload {
  return {
    blog_id: req.blogId,
    allow_ccl: req.allowCcl,
    allow_commercial: req.allowCommercial,
    change_content: req.changeContent,
  };
}
