import React, { useState } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { LeftPanel } from './components/Panels/LeftPanel';
import { RightPanel } from './components/Panels/RightPanel';
import { GenerationState } from './types/generation';
import { generateCode } from './services/api';

function App() {
  const [generationState, setGenerationState] = useState<GenerationState>({
    status: 'idle',
    files: {},
    currentFile: null,
  });

  const handleGenerate = async (prompt: string) => {
    setGenerationState({
      status: 'generating',
      files: {},
      currentFile: null,
    });

    try {
      const files = await generateCode(prompt);
      
      setGenerationState({
        status: 'completed',
        files,
        currentFile: Object.keys(files)[0] || null,
      });
    } catch (error) {
      setGenerationState((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  };

  const handleFileSelect = (path: string) => {
    setGenerationState((prev) => ({
      ...prev,
      currentFile: path,
    }));
  };

  return (
    <MainLayout
      leftPanel={
        <LeftPanel
          onSubmit={handleGenerate}
          isLoading={generationState.status === 'generating'}
        />
      }
      rightPanel={
        <RightPanel
          state={generationState}
          onFileSelect={handleFileSelect}
        />
      }
    />
  );
}

export default App;