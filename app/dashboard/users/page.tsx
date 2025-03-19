import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default function UsersPage() {
  return (
    <div className='container mx-auto py-4'>
      <DataTable
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
      />
    </div>
  );
}
