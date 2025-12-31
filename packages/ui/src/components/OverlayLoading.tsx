import { Loading } from './Loading';

interface Props {
  active: boolean;
}

export const OverlayLoading = ({ active }: Props) => {
  if (!active) return null;
  return (
    <div className='absolute inset-0 bg-zinc-100 opacity-50 backdrop-blur-sm z-50 flex items-center justify-center'>
      <Loading size='lg' />
    </div>
  );
};
