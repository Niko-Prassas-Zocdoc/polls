import prisma from '@/lib/prisma';

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
      <h1 className="text-3xl font-bold mb-8">Active Polls</h1>
      {polls.length === 0 ? (
        <p className="text-gray-500">No polls available yet.</p>
      ) : (
        <div className="space-y-6">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{poll.title}</h2>
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
