import { useEffect, useState, useRef, type KeyboardEvent } from 'react';
import { clsx } from 'clsx';
import { SelectTrigger } from './SelectTrigger';
import { SelectDropdownMenu } from './SelectDropdownMenu';

export interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<T> {
  options: SelectOption<T>[];
  title?: string;
  description?: string;
  value?: T;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: T) => void;
}

export const Select = <T extends string | number>({ options, title, description, value, placeholder, error, disabled, className, onChange }: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusedIdx >= 0) {
          const option = options[focusedIdx];
          if (!option.disabled) handleSelect(option.value);
        } else {
          setIsOpen(prev => !prev);
          if (!isOpen) {
            setFocusedIdx(0);
            calculateDropdownPosition();
          }
        }

        break;

      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        const startIdxUp = isOpen ? focusedIdx : e.key === 'ArrowDown' ? -1 : options.length;
        setFocusedIdx(findNextEnabledIdx(startIdxUp, e.key === 'ArrowDown' ? 'down' : 'up'));
        if (!isOpen) {
          setIsOpen(true);
          calculateDropdownPosition();
        }
        break;

      case 'Escape':
      case 'Tab':
        setIsOpen(false);
        setFocusedIdx(-1);
        break;
    }
  };

  const findNextEnabledIdx = (startIdx: number, direction: 'up' | 'down'): number => {
    let idx = startIdx;

    if (options.every(opt => !!opt.disabled)) return -1;

    while (true) {
      idx += direction === 'down' ? 1 : -1;
      if (idx === -1) idx = options.length - 1;
      if (idx === options.length) idx = 0;
      if (!options[idx].disabled) return idx;
    }
  };

  const handleSelect = (newValue: T) => {
    onChange?.(newValue);
    setIsOpen(false);
    setFocusedIdx(-1);
  };

  // Calculate dropdown position based on available space
  const calculateDropdownPosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const dropdownHeight = 240; // Approximate max height (60px * 4 items)

    // Default to bottom if there's enough space
    if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
      setDropdownPosition('bottom');
    } else {
      setDropdownPosition('top');
    }
  };

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen(prev => !prev);
    if (!isOpen) {
      calculateDropdownPosition();
      setFocusedIdx(findNextEnabledIdx(0, 'down'));
    }
  };

  return (
    <div className={clsx('space-y-1', className)}>
      {title && <label className='block text-sm font-medium text-zinc-700'>{title}</label>}
      {description && <p className='text-sm text-zinc-500'>{description}</p>}

      <div ref={selectRef} className='relative min-w-20' onKeyDown={handleKeyDown} tabIndex={disabled ? -1 : 0}>
        <SelectTrigger
          ref={triggerRef}
          isOpen={isOpen}
          selectedLabel={options.find(opt => opt.value === value)?.label}
          placeholder={placeholder}
          error={error}
          disabled={disabled}
          onToggle={handleToggle}
        />

        {isOpen && !disabled && <SelectDropdownMenu focusedIdx={focusedIdx} options={options} selectedValue={value} position={dropdownPosition} onSelect={handleSelect} onFocusedIdx={setFocusedIdx} />}
      </div>

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};
