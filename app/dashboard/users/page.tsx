import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
  return (
    <div className='container mx-auto'>
      <DataTable
        filters={['name', 'email', 'address', 'age']}
        columns={columns}
        data={[
          {
            id: '1',
            name: 'John Doe',
            email: 'john@doe.com',
            address: '123 Main St',
            age: 30,
          },
          {
            id: '2',
            name: 'Jane Doe',
            email: 'jane@doe.com',
            address: '123 Main St',
            age: 30,
          },
        ]}
        filtersPrefix={
          <Link href='/dashboard/users/create' className='w-full'>
            <Button className='w-full flex items-center justify-center'>
              <Plus />
              Add User
            </Button>
          </Link>
        }
      />
    </div>
  );
}
