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
        data={[]}
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
