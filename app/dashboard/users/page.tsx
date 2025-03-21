'use client';

import { DataTable } from '@/components/ui/data-table';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { usersService } from '@/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { createColumns, User } from './columns';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: users = [],
    isLoading,
    isFetching,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => usersService.getAllUsers(),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => usersService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  if (isLoading || isFetching || deleteUserMutation.isPending) {
    return (
      <div className='container mx-auto space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
        <div className='rounded-md border'>
          <div className='h-40 flex items-center justify-center'>
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto'>
        <div className='rounded-md border p-4 bg-destructive/10 text-destructive'>
          Error loading users. Please try refreshing the page.
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <DataTable
        filters={['name', 'email', 'address']}
        columns={createColumns({
          onDelete: (userId) => {
            deleteUserMutation.mutate(userId);
          },
          onEdit: (userId) => {
            router.push(`/dashboard/users/${userId}`);
          },
        })}
        data={users}
        filtersPrefix={
          <Link href='/dashboard/users/create' className='w-full'>
            <Button className='w-full flex items-center justify-center'>
              <Plus />
              Create User
            </Button>
          </Link>
        }
      />
    </div>
  );
}
