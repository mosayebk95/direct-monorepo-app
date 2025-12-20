import type { ChangeEventHandler } from 'react';
import { Button, Icon, Input, Select, type SelectOption } from '@monorepo/ui';

const statusOptions: SelectOption[] = [
  { value: '', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Suspended', label: 'Suspended' },
  { value: 'Pending', label: 'Pending' },
];

const roleOptions: SelectOption[] = [
  { value: '', label: 'All Roles' },
  { value: 'Admin', label: 'Admin' },
  { value: 'User', label: 'User' },
];

interface Props {
  keyword: string;
  status: string;
  role: string;
  onKeywordChange: ChangeEventHandler<HTMLInputElement>;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onResetFilters: () => void;
  onReload: () => void;
}
const Filters = ({ keyword, status, role, onKeywordChange, onStatusChange, onRoleChange, onResetFilters, onReload }: Props) => {
  return (
    <div className='flex flex-col md:flex-row md:items-end gap-3 p-6 border-b border-zinc-200'>
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
