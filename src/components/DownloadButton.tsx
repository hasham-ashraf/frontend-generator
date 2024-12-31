import React from 'react';
import { Download } from 'lucide-react';
import { downloadCode } from '../utils/download';

interface DownloadButtonProps {
  files: Record<string, string>;
  disabled?: boolean;
}

export function DownloadButton({ files, disabled }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      await downloadCode(files);
    } catch (error) {
      console.error('Failed to download code:', error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-4 h-4" />
      <span>Download</span>
    </button>
  );
}