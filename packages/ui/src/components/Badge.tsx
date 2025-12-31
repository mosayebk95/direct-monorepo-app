import clsx from 'clsx';

interface Props {
  color?: 'success' | 'danger' | 'warning';
  className?: string;
}

export const Badge = ({ children, color, className }: React.PropsWithChildren<Props>) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-medium rounded-full ',
        {
          'bg-green-100 text-green-800': color === 'success',
          'bg-red-100 text-red-800': color === 'danger',
          'bg-yellow-100 text-yellow-800': color === 'warning',
          'bg-zinc-100 text-zinc-800': !color,
        },
        className
      )}
    >
      {children}
    </span>
  );
};
