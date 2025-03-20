'use client';

import { UserForm } from '@/components/forms/user-form';

export default function CreateUserPage() {
  return (
    <div className='container mx-auto rounded-md border p-4'>
      <UserForm
        onSubmit={(values) => {
          console.log(values);
        }}
      />
    </div>
  );
}
