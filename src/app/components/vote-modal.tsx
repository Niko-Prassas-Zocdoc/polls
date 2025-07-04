'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { vote } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type Poll = {
  id: string;
  title: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    voteCount: number;
  }>;
};

type VoteModalProps = {
  poll: Poll;
  isOpen: boolean;
  onClose: () => void;
};

export default function VoteModal({ poll, isOpen, onClose }: VoteModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      return;
    }

    setIsSubmitting(true);

    try {
      await vote(selectedOption);
      onClose();
      router.refresh(); // Refresh the page to show updated vote counts
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vote on Poll</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg mb-2">{poll.title}</h3>
          <p className="text-gray-600 mb-4">{poll.question}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3 mb-6">
            {poll.options.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="option"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="flex-1">{option.text}</span>
                <span className="text-sm text-gray-500">{option.voteCount} votes</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedOption || isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Voting...' : 'Vote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
