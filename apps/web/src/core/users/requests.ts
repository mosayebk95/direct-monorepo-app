import type { UsersRequest, UsersResponse, User } from './models';
import { mockUsers } from './mockData';
import { paginate } from '@monorepo/utils';

export const getUsers = (params: UsersRequest): Promise<UsersResponse> => {
  return new Promise(resolve => {
    // Simulate API delay
    setTimeout(() => {
      const { page, pageSize, keyword, status, role, sortBy, sortOrder } = params;
      let filteredUsers = [...mockUsers];

      // Apply search filter
      if (keyword) {
        filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()) || user.email.toLowerCase().includes(keyword.toLowerCase()));
      }

      // Apply status filter
      if (status) {
        filteredUsers = filteredUsers.filter(user => user.status === status);
      }

      // Apply role filter
      if (role) {
        filteredUsers = filteredUsers.filter(user => user.role === role);
      }

      // Apply sorting
      if (sortBy) {
        filteredUsers.sort((a, b) => {
          const aValue = a[sortBy as keyof User];
          const bValue = b[sortBy as keyof User];

          if (sortOrder === 'asc') return aValue > bValue ? 1 : -1;
          else return aValue < bValue ? 1 : -1;
        });
      }

      const reponse: UsersResponse = {
        data: paginate(filteredUsers, page, pageSize),
        total: filteredUsers.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredUsers.length / pageSize),
      };

      resolve(reponse);
    }, 1000); // 1000ms delay to simulate network
  });
};
