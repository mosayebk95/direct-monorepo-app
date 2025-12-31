import clsx from 'clsx';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, MoveDown, MoveUp, MoveVertical, RefreshCw, type LucideIcon } from 'lucide-react';

export type IconName = 'chevron-down' | 'chevron-left' | 'chevron-right' | 'chevrons-left' | 'chevrons-right' | 'file-text' | 'move-down' | 'move-up' | 'move-vertical' | 'refresh';

const icons: Record<IconName, LucideIcon> = {
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevrons-left': ChevronsLeft,
  'chevrons-right': ChevronsRight,
  'file-text': FileText,
  'move-down': MoveDown,
  'move-up': MoveUp,
  'move-vertical': MoveVertical,
  refresh: RefreshCw,
};

interface Props {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const Icon = ({ name, size = 20, strokeWidth = 2, className }: Props) => {
  const IconComponent = icons[name];

  return <IconComponent size={size} strokeWidth={strokeWidth} className={clsx('inline-block', className)} />;
};
