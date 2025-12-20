import { useState } from 'react';

import { Table, type Column } from '@monorepo/ui';
import { changeDateFormat } from '@monorepo/utils';
import { type UsersResponse, type User } from '../../api/users';

interface Props {
  users: UsersResponse | null;
  loading: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
  onSort: (columnKey: string, direction: 'asc' | 'desc') => void;
  onPageSizeChange: (value: number) => void;
  onPageChange: (value: number) => void;
}
const UsersList = ({ users, ...rest }: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const columns: Column<User>[] = [
    { key: 'id', title: 'ID', sortable: true, width: '75px', align: 'center' },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      render: (_, user) => (
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center h-10 w-10 rounded-full bg-zinc-100'>
            <span className='text-base font-medium text-zinc-600'>{user.name.charAt(0)}</span>
          </div>
          <div>
            <div className='font-medium text-zinc-900'>{user.name}</div>
            <div className='text-sm text-zinc-500'>{user.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'role', title: 'Role', sortable: true },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      align: 'center',
      render: value => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Suspended' ? 'bg-red-100 text-red-800' : value === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
        >
          {value}
        </span>
      ),
    },
    { key: 'joinDate', title: 'Join Date', sortable: true, width: '150px', align: 'end', render: value => changeDateFormat(value) },
  ];

  const handleRowClick = (item: User) => {
    setSelectedUser(selectedUser?.id === item.id ? null : item);
  };

  return (
    <Table
      columns={columns}
      data={users?.data}
      selectedRowId={selectedUser?.id}
      className='m-6'
      keyExtractor={user => user.id}
      onRowClick={handleRowClick}
      totalPages={users?.totalPages || 1}
      {...rest}
    />
  );
};

export default UsersList;
