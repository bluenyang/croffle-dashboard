export type TagValue =
  | 'fe-dev'
  | 'be-dev'
  | 'fs-dev'
  | 'architect'
  | 'da'
  | 'dba'
  | 'se'
  | 'ne'
  | 'devops'
  | 'pm'
  | 'qa'
  | 'ui-ux';

export interface Profile {
  id?: string;
  user_id: string;
  status: 'published' | 'draft';
  sort?: number;
  name: string;
  nickname: string;
  github_username: string;
  email: string;
  tags?: TagValue[];
  linkedin?: string;
  homepage?: string;
  blog?: string;
}

export type SaveProfileRequest = Omit<Profile, 'id' | 'user_id' | 'status' | 'sort'>;
