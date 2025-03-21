'use client';

import { UserForm } from '@/components/forms/user-form';
import { Skeleton } from '@/components/ui/skeleton';
import { usersService } from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { User } from '../columns';
import { useRouter } from 'next/navigation';

export default function EditUserPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['users', params.id],
    queryFn: () => usersService.getUserById(params.id),
  });

  const editUserMutation = useMutation({
    mutationFn: (user: User) => usersService.updateUser(params.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      router.push('/dashboard/users');
      toast.success('User updated successfully');
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });

  if (isLoading || isFetching) {
    return (
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 rounded-md border p-10'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto'>
        <div className='rounded-md border p-4 bg-destructive/10 text-destructive'>
          Error loading user. Please try refreshing the page.
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto rounded-md border p-4'>
      <UserForm
        key={user?.id}
        user={user}
        onSubmit={(values) => {
          editUserMutation.mutate({
            id: params.id,
            ...values,
          });
        }}
      />
    </div>
  );
}
