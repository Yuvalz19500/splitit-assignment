'use client';

import { UserForm, UserFormValues } from '@/components/forms/user-form';
import { usersService } from '@/services';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CreateUserPage() {
  const router = useRouter();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      await usersService.createUser(values);
      toast.success('User created successfully');
      router.push('/dashboard/users');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  return (
    <div className='container mx-auto rounded-md border p-4'>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
