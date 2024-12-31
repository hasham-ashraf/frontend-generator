import React from 'react';
import { Loader2 } from 'lucide-react';
import { GenerationState } from '../types/generation';

interface GenerationStatusProps {
  state: GenerationState;
}

export function GenerationStatus({ state }: GenerationStatusProps) {
  if (state.status === 'idle') return null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-lg bg-white shadow p-4">
        <div className="flex items-center gap-3">
          {state.status === 'generating' && (
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          )}
          <span className="text-sm font-medium">
            {state.status === 'generating' && 'Generating your application...'}
            {state.status === 'completed' && 'Generation completed!'}
            {state.status === 'error' && 'Error generating application'}
          </span>
        </div>
        {state.error && (
          <p className="mt-2 text-sm text-red-600">{state.error}</p>
        )}
      </div>
    </div>
  );
}