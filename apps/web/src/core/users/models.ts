import type { SortOrder } from '@monorepo/ui';

export type UserRole = 'Admin' | 'User' | '';
export type UserStatus = 'Active' | 'Suspended' | 'Pending' | '';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
}

export interface UsersResponse {
  data: User[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UsersRequest {
  page: number;
  pageSize: number;
  keyword?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}
