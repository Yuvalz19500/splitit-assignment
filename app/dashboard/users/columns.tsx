'use client';

import { Button } from '@/components/ui/button';
import { SortButtonHeader } from '@/components/ui/sort-button-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  age: number;
};

interface Props {
  onDelete: (userId: string) => void;
  onEdit: (userId: string) => void;
}

export const createColumns = ({
  onDelete,
  onEdit,
}: Props): ColumnDef<User>[] => [
  {
    header: ({ column }) => {
      return <SortButtonHeader column={column}>Name</SortButtonHeader>;
    },
    accessorKey: 'name',
  },
  {
    header: ({ column }) => {
      return <SortButtonHeader column={column}>Email</SortButtonHeader>;
    },
    accessorKey: 'email',
  },
  {
    header: ({ column }) => {
      return <SortButtonHeader column={column}>Address</SortButtonHeader>;
    },
    accessorKey: 'address',
  },
  {
    header: ({ column }) => {
      return <SortButtonHeader column={column}>Age</SortButtonHeader>;
    },
    accessorKey: 'age',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                onEdit(row.original.id);
              }}
            >
              <Pencil className='mr-2 h-4 w-4' />
              Edit Customer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(row.original.id)}
              className='text-red-600 hover:text-red-600 focus:text-red-600 data-[highlighted]:text-red-600'
            >
              <Trash2 className='mr-2 h-4 w-4 text-red-600' />
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
