import { deletePoll } from '@/lib/actions';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreatePoll() {
  return (
    <Link
      href="/polls/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Poll</span> <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeletePoll({ pollId }: { pollId: string }) {
  const deletePollById = deletePoll.bind(null, pollId);
  return (
    <form action={deletePollById}>
      <button
        type="submit"
        className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </form>
  );
}
