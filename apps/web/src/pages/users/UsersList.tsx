import { useState } from 'react';

import { Table, Badge, type Column, type SortOrder } from '@monorepo/ui';
import { changeDateFormat } from '@monorepo/utils';
import { type UsersResponse, type User } from '../../core/users';

interface Props {
  users: UsersResponse | null;
  loading: boolean;
  sortBy: keyof User;
  sortOrder: SortOrder;
  onSort: (columnKey: keyof User, direction: SortOrder) => void;
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
    { key: 'status', title: 'Status', sortable: true, align: 'center', render: value => <Badge color={value === 'Suspended' ? 'danger' : value === 'Pending' ? 'warning' : 'success'}>{value}</Badge> },
    { key: 'joinDate', title: 'Join Date', sortable: true, width: '150px', align: 'end', render: value => changeDateFormat(value) },
  ];

  return (
    <Table
      columns={columns}
      data={users?.data}
      selectedRowId={selectedUser?.id}
      keyExtractor={user => user.id}
      onRowClick={(user: User) => setSelectedUser(selectedUser?.id === user.id ? null : user)}
      className='m-6'
      {...rest}
    />
  );
};

export default UsersList;
