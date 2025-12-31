import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Icon } from '../Icon';

interface Props {
  isOpen: boolean;
  selectedLabel?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onToggle: () => void;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, Props>(({ isOpen, selectedLabel, placeholder = 'Select an option', error, disabled, onToggle }, ref) => {
  return (
    <button
      ref={ref}
      type='button'
      className={clsx(
        'flex items-center justify-between w-full px-3 py-2 text-start border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors',
        error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500',
        disabled ? 'bg-zinc-100 text-zinc-500 cursor-not-allowed' : 'bg-white hover:border-zinc-400'
      )}
      disabled={disabled}
      onClick={onToggle}
    >
      <span className={clsx(!selectedLabel && 'text-zinc-500')}>{selectedLabel || placeholder}</span>
      <Icon name='chevron-down' className={clsx('text-zinc-400 transition-transform', isOpen && 'transform rotate-180')} />
    </button>
  );
});
