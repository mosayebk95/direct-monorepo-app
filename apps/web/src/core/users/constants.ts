import type { SelectOption } from '@monorepo/ui';
import type { UserRole, UserStatus } from './models';

const statuses: Record<UserStatus, string> = {
  '': 'All',
  Active: 'Active',
  Suspended: 'Suspended',
  Pending: 'Pending',
};

const roles: Record<UserRole, string> = {
  '': 'All Roles',
  Admin: 'Admin',
  User: 'User',
};

export const statusOptions: SelectOption<UserStatus>[] = Object.keys(statuses).map(key => ({ value: key as UserStatus, label: statuses[key as UserStatus] }));
export const roleOptions: SelectOption<UserRole>[] = Object.keys(roles).map(key => ({ value: key as UserRole, label: roles[key as UserRole] }));
