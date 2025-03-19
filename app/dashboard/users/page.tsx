import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default function UsersPage() {
  return (
    <div className='container mx-auto py-4'>
      <DataTable
        columns={columns}
        data={[
          {
            name: 'John Doe',
            email: 'john@doe.com',
            address: '123 Main St',
            age: 30,
          },
        ]}
      />
    </div>
  );
}
