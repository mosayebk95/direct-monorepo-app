import { clsx } from 'clsx';
import { Icon } from '../Icon';
import type { Column, SortOrder } from './Table';

interface Props<T> {
  columns: Column<T>[];
  sortBy?: keyof T;
  sortOrder?: SortOrder;
  onSort?: (columnKey: keyof T, newOrder: SortOrder) => void;
}

export const TableHead = <T extends Record<string, any>>({ columns, sortBy, sortOrder, onSort }: Props<T>) => {
  const handleSort = (columnKey: string, sortable?: boolean) => {
    if (!onSort || !sortable) return;

    const newOrder = sortBy === columnKey && sortOrder === 'asc' ? 'desc' : 'asc';

    onSort(columnKey, newOrder);
  };

  return (
    <thead className='bg-zinc-50'>
      <tr>
        {columns.map(({ key, title, sortable, width, align }) => (
          <th
            key={key as string}
            scope='col'
            className={clsx('px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider', sortable && 'cursor-pointer hover:bg-zinc-100 transition-colors')}
            onClick={() => handleSort(key as string, sortable)}
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
              {sortable && <Icon name={sortBy !== key ? 'move-vertical' : sortOrder === 'asc' ? 'move-up' : 'move-down'} className={clsx(sortBy !== key && 'text-zinc-300')} size={14} />}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
