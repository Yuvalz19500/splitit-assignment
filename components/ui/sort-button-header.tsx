import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Column } from '@tanstack/react-table';

type Props = {
  column: Column<any>;
  children: React.ReactNode;
};

export function SortButtonHeader({ column, children }: Props) {
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
    <Button variant='ghost' onClick={handleSort} className='group relative'>
      {children}
      <span
        className={`ml-2 ${
          isSorted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        } transition-opacity`}
      >
        {isSorted === false && <ArrowUpDown className='h-3 w-3' />}
        {isSorted === 'asc' && <ArrowUp className='h-3 w-3' />}
        {isSorted === 'desc' && <ArrowDown className='h-3 w-3' />}
      </span>
    </Button>
  );
}
