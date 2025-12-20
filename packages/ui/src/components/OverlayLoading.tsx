interface Props {
  active: boolean;
}

export const OverlayLoading = ({ active }: Props) => {
  if (!active) return null;
  return (
    <div className='absolute inset-0 bg-zinc-100 opacity-50 backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className='w-12 h-12 border-4 border-zinc-500 border-t-transparent rounded-full animate-spin' role='status' aria-label='loading'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};
