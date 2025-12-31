import { Select, type SelectOption } from './select';
import { Icon, type IconName } from './Icon';
import { Button } from './Button';

const pageSizes: SelectOption<number>[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
];

interface Item {
  value: number | null;
  title: string;
  icon?: IconName;
  disabled: boolean;
}

export interface TableFooterProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageSizeChange: (value: number) => void;
  onPageChange: (value: number) => void;
  className?: string;
}
export const Pagination = ({ page, pageSize, totalPages, onPageSizeChange, onPageChange, className = '' }: TableFooterProps) => {
  const items: Item[] = [
    { value: 1, title: 'First Page', icon: 'chevrons-left', disabled: page === 1 },
    { value: page - 1, title: 'Previous Page', icon: 'chevron-left', disabled: page === 1 },
    { value: null, title: `Page ${page} of ${totalPages}`, disabled: false },
    { value: page + 1, title: 'Next Page', icon: 'chevron-right', disabled: page === totalPages },
    { value: totalPages, title: 'Last Page', icon: 'chevrons-right', disabled: page === totalPages },
  ];

  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}>
      <Select title='Items per page:' options={pageSizes} value={pageSize} className='flex items-center gap-3 space-y-0' onChange={onPageSizeChange} />

      <div className='flex items-stretch gap-2'>
        {items.map(({ value, title, icon, disabled }, idx) => (
          <Button key={idx} variant={value === null ? 'primary' : 'outline'} size='sm' title={title} disabled={disabled} onClick={disabled || value === null ? undefined : () => onPageChange(value)}>
            {icon ? <Icon name={icon} /> : title}
          </Button>
        ))}
      </div>
    </div>
  );
};
