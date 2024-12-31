import React from 'react';
import { PromptInput } from '../PromptInput';

interface LeftPanelProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export function LeftPanel({ onSubmit, isLoading }: LeftPanelProps) {
  return (
    <div className="p-6">
      <PromptInput onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}