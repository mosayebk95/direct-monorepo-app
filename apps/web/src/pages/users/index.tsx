import { useState, useEffect, type ChangeEvent } from 'react';

import { OverlayLoading } from '@monorepo/ui';
import Header from './Header';
import Filters from './Filters';
import UsersList from './UsersList';

import { stripTag } from '@monorepo/utils';
import { getUsers, type UsersResponse } from '../../api/users';

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersResponse | null>(null);

  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  let searchTimer: any = null;

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setKeyword(stripTag(e.target.value));
      setPage(1);
    }, 1000);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setKeyword('');
    setStatus('');
    setRole('');
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  const handleSort = (columnKey: string, direction: 'asc' | 'desc') => {
    setSortBy(columnKey);
    setSortOrder(direction);
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <Header />
      <div className='relative bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden'>
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

        <UsersList
          users={users}
          loading={loading && users === null}
          sortBy={sortBy}
          sortOrder={sortOrder}
          page={page}
          pageSize={pageSize}
          onSort={handleSort}
          onPageSizeChange={handlePageSizeChange}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
export default UsersPage;
