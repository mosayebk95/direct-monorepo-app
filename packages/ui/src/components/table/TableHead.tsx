import { clsx } from 'clsx';
import type { Column } from './Table';
import { Icon } from '../Icon';

interface Props<T> {
  columns: Column<T>[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
}

export const TableHead = <T extends Record<string, any>>({ columns, sortColumn, sortDirection, onSort }: Props<T>) => {
  const handleSort = (columnKey: string, sortable?: boolean) => {
    if (!onSort || !sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';

    onSort(columnKey, newDirection);
  };

  return (
    <thead className='bg-zinc-50'>
      <tr>
        {columns.map(({ key, title, sortable, width, align }) => (
          <th
            key={key}
            scope='col'
            className={clsx(
              'px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider',
              sortable && 'cursor-pointer hover:bg-zinc-100 transition-colors'
            )}
            onClick={() => handleSort(key, sortable)}
            style={width ? { width } : undefined}
          >
            <div
              className={clsx('flex items-center gap-2', {
                'justify-start': align === 'start',
                'justify-center': align === 'center',
                'justify-end': align === 'end',
              })}
            >
              <div>{title}</div>
              {sortable && (
                <Icon
                  name={sortColumn !== key ? 'move-vertical' : sortDirection === 'asc' ? 'move-up' : 'move-down'}
                  className={clsx(sortColumn !== key && 'text-zinc-300')}
                  size={14}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
