'use client';

import { UserForm, UserFormValues } from '@/components/forms/user-form';
import { usersService } from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateUserPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createUserMutation = useMutation({
    mutationFn: (user: UserFormValues) => usersService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully');
      router.push('/dashboard/users');
    },
    onError: () => {
      toast.error('Failed to create user');
    },
  });

  return (
    <div className='container mx-auto rounded-md border p-4'>
      <UserForm
        onSubmit={(values) => createUserMutation.mutate(values)}
        isLoading={createUserMutation.isPending}
      />
    </div>
  );
}
