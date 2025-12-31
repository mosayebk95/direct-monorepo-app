import type { ChangeEventHandler } from 'react';
import { Button, Icon, Input, Select } from '@monorepo/ui';
import { statusOptions, roleOptions, type UserRole, type UserStatus } from '../../core/users';

interface Props {
  keyword: string;
  status: UserStatus;
  role: UserRole;
  onKeywordChange: ChangeEventHandler<HTMLInputElement>;
  onStatusChange: (value: UserStatus) => void;
  onRoleChange: (value: UserRole) => void;
  onResetFilters: () => void;
  onReload: () => void;
}
const Filters = ({ keyword, status, role, onKeywordChange, onStatusChange, onRoleChange, onResetFilters, onReload }: Props) => {
  return (
    <div className='flex flex-col md:flex-row md:items-end gap-3 border-b border-zinc-200 p-6'>
      <div className='flex-1'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          <Input title='Search Users' placeholder='Search by name or email...' onChange={onKeywordChange} />
          <Select title='Status' placeholder='Select status...' options={statusOptions} value={status} onChange={onStatusChange} />
          <Select title='Role' placeholder='Select role...' options={roleOptions} value={role} onChange={onRoleChange} />
        </div>
      </div>
      <div className='flex gap-3'>
        <Button variant='outline' onClick={onResetFilters} disabled={!keyword && !status && !role}>
          Reset Filters
        </Button>
        <Button onClick={onReload}>
          <Icon name='refresh' />
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default Filters;
