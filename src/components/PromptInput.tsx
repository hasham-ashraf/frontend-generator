import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const EXAMPLE_PROMPTS = [
  'Create a todo list app with React and TypeScript',
  'Build a weather dashboard with a search feature',
  'Generate a blog homepage with recent posts',
];

export function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the React application you want to generate..."
            className="w-full h-32 p-4 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Example prompts:</h3>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((examplePrompt) => (
            <button
              key={examplePrompt}
              onClick={() => setPrompt(examplePrompt)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
            >
              {examplePrompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}