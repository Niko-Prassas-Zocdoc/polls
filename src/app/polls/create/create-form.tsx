'use client';

import { useState } from 'react';

export default function CreatePollForm() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '']);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const deleteAnswer = (index: number) => {
    if (answers.length <= 2) return; // Prevent deleting if only 2 answers remain
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, '']);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Question:', question);
    console.log('Answers:', answers);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Question
        </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your question here"
        />
      </div>

      {answers.map((answer, index) => (
        <div key={index} className="mb-4">
          <label htmlFor={`answer-${index}`} className="block text-sm font-medium text-gray-700">
            Answer {index + 1}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id={`answer-${index}`}
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={`Enter answer ${index + 1}`}
            />
            {answers.length > 2 && (
              <button
                type="button"
                onClick={() => deleteAnswer(index)}
                className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addAnswer}
        className="mr-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add another answer
      </button>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Poll
      </button>
    </form>
  );
}
