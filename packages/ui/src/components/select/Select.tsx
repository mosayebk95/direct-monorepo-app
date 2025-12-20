import { useEffect, useState, useRef, type KeyboardEvent } from 'react';
import { clsx } from 'clsx';
import { SelectTrigger } from './SelectTrigger';
import { SelectDropdownMenu } from './SelectDropdownMenu';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  title?: string;
  description?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export const Select = ({ options, title, description, value, placeholder, error, disabled = false, className, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);

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
          setIsOpen(!isOpen);
          if (!isOpen) setFocusedIdx(findNextEnabledIdx(0, 'down'));
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setFocusedIdx(-1);
        break;

      case 'ArrowDown':
        e.preventDefault();
        const startIdx = isOpen ? focusedIdx : -1;
        setFocusedIdx(findNextEnabledIdx(startIdx, 'down'));
        if (!isOpen) setIsOpen(true);
        break;

      case 'ArrowUp':
        e.preventDefault();
        const startIdx2 = isOpen ? focusedIdx : options.length;
        setFocusedIdx(findNextEnabledIdx(startIdx2, 'up'));
        if (!isOpen) setIsOpen(true);
        break;

      case 'Tab':
        setIsOpen(false);
        setFocusedIdx(-1);
        break;
    }
  };

  const findNextEnabledIdx = (startIdx: number, direction: 'up' | 'down'): number => {
    let index = startIdx;

    do {
      index += direction === 'down' ? 1 : -1;
      if (!options[index].disabled) return index;
    } while (index >= 0 && index < options.length);

    return -1;
  };

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
    setFocusedIdx(-1);
  };

  return (
    <div className={clsx('relative', className)}>
      {title && <label className='block text-sm font-medium text-zinc-700 mb-1'>{title}</label>}
      {description && <p className='text-sm text-zinc-500 mb-1'>{description}</p>}

      <div ref={selectRef} className='relative' onKeyDown={handleKeyDown} tabIndex={disabled ? -1 : 0}>
        <SelectTrigger
          isOpen={isOpen}
          selectedLabel={options.find(opt => opt.value === value)?.label}
          placeholder={placeholder}
          error={error}
          disabled={disabled}
          onOpen={setIsOpen}
        />

        {isOpen && !disabled && (
          <SelectDropdownMenu focusedIdx={focusedIdx} options={options} selectedValue={value} onSelect={handleSelect} onFocusedIdx={setFocusedIdx} />
        )}
      </div>

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
};
