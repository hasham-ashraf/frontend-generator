export interface GenerationRequest {
  prompt: string;
}

export interface GenerationState {
  status: 'idle' | 'generating' | 'completed' | 'error';
  files: Record<string, string>;
  currentFile: string | null;
  error?: string;
}

export interface FileViewerProps {
  files: Record<string, string>;
  currentFile: string | null;
  onFileSelect: (path: string) => void;
}