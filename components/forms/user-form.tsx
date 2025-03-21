'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { User } from '@/app/dashboard/users/columns';

export type UserFormValues = Omit<User, 'id'>;

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().min(1, 'Email is required.').email({
      message: 'Invalid email address.',
    }),
    age: z.number().min(18, 'Age must be at least 18 years old.'),
    address: z.string().min(1, 'Address is required.'),
  })
  .required();

type Props = {
  user?: User;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export function UserForm({ onSubmit, user }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || 18,
      address: user?.address || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='h-[100px] flex flex-col'>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your name...' {...field} />
                </FormControl>
                <FormMessage className='mt-1' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='h-[100px] flex flex-col'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your email...'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='mt-1' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='age'
            render={({ field }) => (
              <FormItem className='h-[100px] flex flex-col'>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your age...'
                    type='number'
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === '' ? '' : Number(value));
                    }}
                  />
                </FormControl>
                <FormMessage className='mt-1' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem className='h-[100px] flex flex-col'>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your address...' {...field} />
                </FormControl>
                <FormMessage className='mt-1' />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-4'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
