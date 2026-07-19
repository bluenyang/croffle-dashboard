export interface Navigation {
  id: string;
  blogId: string;
  label: string;
  url: string | null;
  icon: string | null;
  isCategory: boolean;
  parentId: string | null;
  sortOrder: number;
  children?: Navigation[];
}

export interface NavigationSaveRequest {
  blogId: string;
  label: string;
  url?: string | null;
  icon?: string | null;
  isCategory?: boolean;
  parentId?: string | null;
  sortOrder?: number;
}
