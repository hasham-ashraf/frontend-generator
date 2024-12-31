import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { FileViewerProps } from '../types/generation';
import { FolderTree, Code2 } from 'lucide-react';
import { clsx } from 'clsx';

export function FileViewer({ files, currentFile, onFileSelect }: FileViewerProps) {
  const fileList = Object.keys(files).sort();

  return (
    <div className="flex h-full">
      <div className="w-64 bg-gray-50 border-r overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-500 flex items-center gap-2">
            <FolderTree className="w-4 h-4" />
            Files
          </h2>
          <ul className="mt-2 space-y-1">
            {fileList.map((file) => (
              <li key={file}>
                <button
                  onClick={() => onFileSelect(file)}
                  className={clsx(
                    'w-full text-left px-2 py-1 rounded text-sm',
                    currentFile === file
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    {file}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {currentFile ? (
          <CodeMirror
            value={files[currentFile]}
            height="100%"
            extensions={[javascript()]}
            theme={oneDark}
            editable={false}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a file to view its contents
          </div>
        )}
      </div>
    </div>
  );
}