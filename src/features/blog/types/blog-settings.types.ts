export type ChangeContentPolicy = 'allow' | 'share_alike' | 'no_derivatives';

export interface BlogSettings {
  id: string;
  blogId: string;
  allowCcl: boolean;
  allowCommercial: boolean;
  changeContent: ChangeContentPolicy;
}

export interface BlogSettingsSaveRequest {
  blogId: string;
  allowCcl: boolean;
  allowCommercial: boolean;
  changeContent: ChangeContentPolicy;
}
