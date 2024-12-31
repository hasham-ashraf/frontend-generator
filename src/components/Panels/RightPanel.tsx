import React from 'react';
import { GenerationStatus } from '../GenerationStatus';
import { FileViewer } from '../FileViewer';
import { LivePreview } from '../Preview/LivePreview';
import { GenerationState } from '../../types/generation';
import { Tabs } from '../Tabs';
import { DownloadButton } from '../DownloadButton';

interface RightPanelProps {
  state: GenerationState;
  onFileSelect: (path: string) => void;
}

export function RightPanel({ state, onFileSelect }: RightPanelProps) {
  const [activeTab, setActiveTab] = React.useState<'code' | 'preview'>('code');

  if (state.status === 'idle') {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Enter a prompt to generate code
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <GenerationStatus state={state} />
      
      {(state.status === 'completed' || Object.keys(state.files).length > 0) && (
        <>
          <div className="px-4 pt-4 flex items-center justify-between">
            <Tabs
              tabs={[
                { id: 'code', label: 'Code' },
                { id: 'preview', label: 'Preview' },
              ]}
              activeTab={activeTab}
              onChange={(tab) => setActiveTab(tab as 'code' | 'preview')}
            />
            <DownloadButton 
              files={state.files} 
              disabled={state.status !== 'completed'} 
            />
          </div>
          
          <div className="flex-1 p-4">
            {activeTab === 'code' ? (
              <div className="h-full rounded-lg overflow-hidden border bg-white">
                <FileViewer
                  files={state.files}
                  currentFile={state.currentFile}
                  onFileSelect={onFileSelect}
                />
              </div>
            ) : (
              <div className="h-full rounded-lg overflow-hidden border bg-white">
                <LivePreview files={state.files} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}