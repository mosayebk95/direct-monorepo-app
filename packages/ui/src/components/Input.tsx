import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  description?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(({ className, title, description, error, id, fullWidth = true, ...rest }, ref) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div className={clsx('space-y-1', className)}>
      {title && (
        <label htmlFor={inputId} className='block text-sm font-medium text-zinc-700'>
          {title}
        </label>
      )}

      {description && <p className='text-sm text-zinc-500'>{description}</p>}

      <input
        ref={ref}
        id={inputId}
        className={clsx(
          'px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors disabled:bg-zinc-100 disabled:text-zinc-500 disabled:cursor-not-allowed',
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500',
          fullWidth && 'w-full'
        )}
        {...rest}
      />

      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
    </div>
  );
});
