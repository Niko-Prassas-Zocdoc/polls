import CreatePollForm from './create-form';
import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

export default async function CreatePollPage() {
  const user = await currentUser();

  if (user?.publicMetadata.role !== 'admin') {
    return notFound();
  }

  return <CreatePollForm />;
}
