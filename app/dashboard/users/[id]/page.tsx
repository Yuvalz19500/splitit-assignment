import { UserForm } from '@/components/forms/user-form';

type Props = {
  params: {
    id: string;
  };
};

export default function EditUserPage({ params }: Props) {
  return (
    <div className='container mx-auto rounded-md border p-4'>
      <UserForm />
    </div>
  );
}
