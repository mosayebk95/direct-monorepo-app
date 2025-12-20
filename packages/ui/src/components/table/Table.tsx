import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Icon } from '../Icon';
import { Loading } from '../Loading';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableFooter } from './TableFooter';

export interface Column<T> {
  key: string;
  title: string;
  sortable?: boolean;
  width?: string;
  align?: 'start' | 'center' | 'end';
  render?: (value: any, item: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[] | null | undefined;
  loading?: boolean;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  selectedRowId?: string | number;
  page: number;
  pageSize: number;
  totalPages: number;
  emptyState?: ReactNode;
  className?: string;
  keyExtractor: (item: T) => string | number;
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (item: T) => void;
  onPageSizeChange: (value: number) => void;
  onPageChange: (value: number) => void;
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  sortColumn,
  sortDirection,
  selectedRowId,
  emptyState,
  className,
  keyExtractor,
  onSort,
  onRowClick,
  ...rest
}: Props<T>) => {
  if (loading) {
    return (
      <div className={clsx('rounded-lg border border-zinc-200 text-center py-12', className)}>
        <Loading className='text-zinc-400' title='Loading...' />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className={clsx('rounded-lg border border-zinc-200 text-center py-12', className)}>
        {emptyState ? (
          emptyState
        ) : (
          <>
            <Icon name='file-text' className='mx-auto h-12 w-12 text-zinc-400' />
            <h3 className='mt-2 text-sm font-medium text-zinc-900'>No data found</h3>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={clsx('overflow-x-auto rounded-lg border border-zinc-200 bg-white', className)}>
      <table className='min-w-full divide-y divide-zinc-200'>
        <TableHead columns={columns} sortColumn={sortColumn} sortDirection={sortDirection} onSort={onSort} />
        <TableBody columns={columns} data={data} selectedRowId={selectedRowId} keyExtractor={keyExtractor} onRowClick={onRowClick} />
        <TableFooter columnsCount={columns.length} {...rest} />
      </table>
    </div>
  );
};
