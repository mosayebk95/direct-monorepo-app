import { useState, useEffect, type ChangeEvent, useRef } from 'react';

import { OverlayLoading, Pagination, type SortOrder } from '@monorepo/ui';
import Header from './Header';
import Filters from './Filters';
import UsersList from './UsersList';

import { stripTag } from '@monorepo/utils';
import { getUsers } from '../../core/users';
import type { User, UsersResponse, UserStatus, UserRole } from '../../core/users';

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersResponse | null>(null);

  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<UserStatus>('');
  const [role, setRole] = useState<UserRole>('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortBy, setSortBy] = useState<keyof User>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const searchTimer = useRef<number>(0);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await getUsers({ page, pageSize, keyword, status, role, sortBy, sortOrder });
      setUsers(result);
    } catch (error) {
      console.error('Error fetching users:', error);
      // In real app, show error message to user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, keyword, status, role, sortBy, sortOrder]);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setKeyword(stripTag(e.target.value));
      setPage(1);
    }, 1000);
  };

  const handleStatusChange = (value: UserStatus) => {
    setStatus(value);
    setPage(1);
  };

  const handleRoleChange = (value: UserRole) => {
    setRole(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  const handleSort = (columnKey: keyof User, direction: SortOrder) => {
    setSortBy(columnKey);
    setSortOrder(direction);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setStatus('');
    setRole('');
    setPage(1);
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='relative bg-white rounded-lg shadow-sm border border-zinc-200'>
        <OverlayLoading active={loading && users !== null} />

        <Filters
          keyword={keyword}
          status={status}
          role={role}
          onKeywordChange={handleKeywordChange}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
          onResetFilters={handleResetFilters}
          onReload={fetchUsers}
        />

        <UsersList users={users} loading={loading && users === null} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} />

        <Pagination page={page} pageSize={pageSize} totalPages={users?.totalPages || 1} onPageSizeChange={handlePageSizeChange} onPageChange={setPage} className='m-6 mt-0' />
      </div>
    </div>
  );
};

export default UsersPage;
