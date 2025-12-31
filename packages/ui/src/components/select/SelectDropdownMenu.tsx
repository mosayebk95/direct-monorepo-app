import type { Dispatch, SetStateAction } from 'react';
import { clsx } from 'clsx';
import type { SelectOption } from './Select';

interface Props<T> {
  focusedIdx: number;
  options: SelectOption<T>[];
  selectedValue?: T;
  position: 'bottom' | 'top';
  onSelect: (value: T) => void;
  onFocusedIdx: Dispatch<SetStateAction<number>>;
}

export const SelectDropdownMenu = <T extends string | number>({ focusedIdx, options, selectedValue, position, onSelect, onFocusedIdx }: Props<T>) => {
  return (
    <div className={clsx('absolute z-50 w-full bg-white border border-zinc-300 rounded-lg shadow-lg max-h-60 overflow-auto', position === 'bottom' ? 'top-full mt-1' : 'bottom-full mb-1')}>
      <div className='py-1'>
        {options.map(({ value, label, disabled }, idx) => (
          <div
            key={value}
            role='option'
            className={clsx(
              'px-3 py-2 cursor-pointer transition-colors',
              focusedIdx === idx ? 'bg-zinc-100' : selectedValue === value && 'bg-zinc-50 text-zinc-700',
              disabled ? 'text-zinc-400 cursor-not-allowed' : 'hover:bg-zinc-100'
            )}
            onClick={() => !disabled && onSelect(value)}
            onMouseEnter={() => !disabled && onFocusedIdx(idx)}
          >
            {label}
          </div>
        ))}

        {!options.length && <div className='px-3 py-2 text-zinc-500 text-center'>No options available</div>}
      </div>
    </div>
  );
};
