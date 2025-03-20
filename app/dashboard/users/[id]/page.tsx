type Props = {
  params: {
    id: string;
  };
};

export default function EditUserPage({ params }: Props) {
  return <div>EditUserPage {params.id}</div>;
}
