import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Column } from '@tanstack/react-table';

type Props<TData> = {
  column: Column<TData>;
  children: React.ReactNode;
};

export function SortButtonHeader<TData>({ column, children }: Props<TData>) {
  const isSorted = column.getIsSorted();

  const handleSort = () => {
    if (isSorted === false) {
      column.toggleSorting(false);
    } else if (isSorted === 'asc') {
      column.toggleSorting(true);
    } else {
      column.clearSorting();
    }
  };

  return (
    <Button
      variant='ghost'
      onClick={handleSort}
      className='group relative h-10 px-2 font-medium -ml-2 justify-start hover:bg-transparent focus:bg-transparent 
      dark:hover:bg-transparent dark:focus:bg-transparent'
    >
      {children}
      <span
        className={`${
          isSorted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        } transition-opacity`}
      >
        {isSorted === false && <ArrowUpDown className='h-3 w-3' />}
        {isSorted === 'desc' && <ArrowUp className='h-3 w-3' />}
        {isSorted === 'asc' && <ArrowDown className='h-3 w-3' />}
      </span>
    </Button>
  );
}
