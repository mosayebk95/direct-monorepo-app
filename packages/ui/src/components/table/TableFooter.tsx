import { Icon, type IconName } from '../Icon';
import { Button } from '../Button';

interface Item {
  value: number | null;
  title: string;
  icon?: IconName;
  disabled: boolean;
}

interface Props {
  columnsCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  onPageSizeChange: (value: number) => void;
  onPageChange: (value: number) => void;
}
export const TableFooter = ({ columnsCount, page, pageSize, totalPages, onPageSizeChange, onPageChange }: Props) => {
  const items: Item[] = [
    { value: 1, title: 'First Page', icon: 'chevrons-left', disabled: page === 1 },
    { value: page - 1, title: 'Previous Page', icon: 'chevron-left', disabled: page === 1 },
    { value: null, title: `Page ${page} of ${totalPages}`, disabled: false },
    { value: page + 1, title: 'Next Page', icon: 'chevron-right', disabled: page === totalPages },
    { value: totalPages, title: 'Last Page', icon: 'chevrons-right', disabled: page === totalPages },
  ];

  return (
    <tfoot>
      <tr>
        <td className='px-6 py-4' colSpan={columnsCount}>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <label className='text-sm text-zinc-600'>Items per page:</label>
              <select
                className='border border-zinc-300 rounded-lg px-3 py-1.5 text-sm'
                value={pageSize}
                onChange={e => onPageSizeChange(Number(e.target.value))}
              >
                {[5, 10, 20, 50].map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex items-stretch gap-2'>
              {items.map(({ value, title, icon, disabled }, idx) => (
                <Button
                  key={idx}
                  variant={value === null ? 'primary' : 'outline'}
                  size='sm'
                  title={title}
                  disabled={disabled}
                  onClick={disabled || value === null ? undefined : () => onPageChange(value)}
                >
                  {icon ? <Icon name={icon} /> : title}
                </Button>
              ))}
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};
