const DEFAULT_ENTRY_FILES = {
  '/index.html': {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  },
  '/src/main.tsx': {
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
  '/src/index.css': {
    code: `@tailwind base;
@tailwind components;
@tailwind utilities;`,
  },
  '/postcss.config.js': {
    code: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  },
  '/tailwind.config.js': {
    code: `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`,
  },
  '/vite.config.ts': {
    code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
  },
};

/**
 * Transforms generated files into Sandpack-compatible format
 */
export function transformFilesForSandpack(files: Record<string, string>) {
  // Start with default entry files
  const sandpackFiles = { ...DEFAULT_ENTRY_FILES };

  // Transform each file
  Object.entries(files).forEach(([path, content]) => {
    // Ensure path starts with /src/
    const normalizedPath = path.startsWith('/src/') ? path : `/src${path.startsWith('/') ? path : '/' + path}`;
    sandpackFiles[normalizedPath] = { code: content };
  });

  return sandpackFiles;
}