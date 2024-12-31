import React from 'react';
import { Split } from 'lucide-react';

interface MainLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export function MainLayout({ leftPanel, rightPanel }: MainLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Split className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold text-gray-900">
              Frontend Generator
            </h1>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[45%] border-r bg-white overflow-y-auto">
          {leftPanel}
        </div>
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          {rightPanel}
        </div>
      </div>
    </div>
  );
}