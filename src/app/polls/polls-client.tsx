'use client';

import { useState } from 'react';
import { DeletePoll } from '@/app/ui/polls/buttons';
import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import VoteModal from '@/app/components/vote-modal';

type Poll = {
  id: string;
  title: string;
  question: string;
  createdAt: Date;
  options: Array<{
    id: string;
    text: string;
    voteCount: number;
    pollId: string;
  }>;
};

type PollsClientProps = {
  polls: Poll[];
};

export default function PollsClient({ polls }: PollsClientProps) {
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVoteClick = (poll: Poll) => {
    setSelectedPoll(poll);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPoll(null);
  };

  return (
    <>
      <div className="space-y-6">
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{poll.title}</h2>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleVoteClick(poll)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Vote
                </button>
                <Link
                  href={`/polls/${poll.id}/edit`}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors p-1"
                >
                  <PencilIcon className="h-4 w-4" />
                </Link>
                <DeletePoll pollId={poll.id} />
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

      {selectedPoll && (
        <VoteModal poll={selectedPoll} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
}
