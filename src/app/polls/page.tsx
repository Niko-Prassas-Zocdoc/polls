import prisma from '@/lib/prisma';
import { CreatePoll } from '@/app/ui/polls/buttons';
import PollsClient from './polls-client';

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
        <PollsClient polls={polls} />
      )}
    </div>
  );
}
