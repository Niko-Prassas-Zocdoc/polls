import prisma from '@/lib/prisma';
import { CreatePoll } from '@/app/ui/polls/buttons';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

async function getPolls() {
  const polls = await prisma.poll.findMany({
    include: {
      options: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return polls;
}

export default async function Polls() {
  const polls = await getPolls();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Active Polls</h1>
        <CreatePoll />
      </div>
      {polls.length === 0 ? (
        <p className="text-gray-500">No polls available yet.</p>
      ) : (
        <div className="space-y-6">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{poll.title}</h2>
                <div className="flex gap-2">
                  <Link
                    href={`/polls/${poll.id}/edit`}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Link>
                  <form>
                    <button
                      type="submit"
                      className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{poll.question}</p>
              <div className="space-y-2">
                {poll.options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <span>{option.text}</span>
                    <span className="text-gray-500">{option.voteCount} votes</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
