import type { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { Loading } from './Loading';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-zinc-800 text-white hover:bg-zinc-950',
  secondary: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300',
  outline: 'border border-zinc-700 text-zinc-700 hover:bg-zinc-100',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = ({ children, className, variant = 'primary', size = 'md', loading, disabled, ...rest }: Props) => {
  const baseClasses = 'inline-flex items-center gap-2 font-medium rounded-lg transition-colors focus:outline-none';

  return (
    <button className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], (disabled || loading) && 'opacity-50 cursor-not-allowed', className)} disabled={disabled || loading} {...rest}>
      {children}
      {loading && <Loading />}
    </button>
  );
};
