import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import { transformFilesForSandpack } from '../../utils/sandpack';

interface LivePreviewProps {
  files: Record<string, string>;
}

export function LivePreview({ files }: LivePreviewProps) {
  const sandpackFiles = transformFilesForSandpack(files);

  return (
    <div className="h-full">
      <SandpackProvider
        template="vite-react-ts"
        files={sandpackFiles}
        customSetup={{
          dependencies: {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "@types/react": "^18.2.0",
            "@types/react-dom": "^18.2.0",
            "tailwindcss": "^3.4.1",
            "postcss": "^8.4.35",
            "autoprefixer": "^10.4.18",
            "lucide-react": "^0.344.0"
          },
        }}
        theme="dark"
      >
        <SandpackLayout>
          <SandpackFileExplorer />
          <SandpackPreview
            showNavigator={true}
            showRefreshButton={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}