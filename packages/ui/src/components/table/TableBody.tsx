import { clsx } from 'clsx';
import type { Column } from './Table';

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  selectedRowId?: string | number;
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
}

export const TableBody = <T extends Record<string, any>>({ columns, data, selectedRowId, keyExtractor, onRowClick }: Props<T>) => {
  return (
    <tbody className='divide-y divide-zinc-200'>
      {data.map(item => {
        const rowKey = keyExtractor(item);
        const isSelected = selectedRowId === rowKey;

        return (
          <tr
            key={rowKey}
            className={clsx(onRowClick && 'cursor-pointer hover:bg-zinc-50 transition-colors', isSelected && 'bg-zinc-100')}
            onClick={() => onRowClick?.(item)}
          >
            {columns.map(({ key, align, render }) => (
              <td
                key={`${rowKey}-${key}`}
                className={clsx('px-6 py-4 text-sm text-zinc-900', {
                  'text-start': align === 'start',
                  'text-center': align === 'center',
                  'text-end': align === 'end',
                })}
              >
                {render ? render(item[key], item) : item[key]}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};
