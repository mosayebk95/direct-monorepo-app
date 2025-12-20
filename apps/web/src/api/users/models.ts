export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Suspended' | 'Pending';
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
  sortOrder?: 'asc' | 'desc';
}
