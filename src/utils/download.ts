import JSZip from 'jszip';

export async function downloadCode(files: Record<string, string>) {
  const zip = new JSZip();
  
  // Add all files to the zip
  Object.entries(files).forEach(([path, content]) => {
    // Remove leading slash and src/ prefix for a cleaner structure
    const cleanPath = path.replace(/^\/?(src\/)?/, '');
    zip.file(cleanPath, content);
  });
  
  // Add package.json
  zip.file('package.json', JSON.stringify({
    name: 'generated-react-app',
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'lucide-react': '^0.344.0'
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.2.0',
      'autoprefixer': '^10.4.18',
      'postcss': '^8.4.35',
      'tailwindcss': '^3.4.1',
      'typescript': '^5.2.0',
      'vite': '^5.0.0'
    }
  }, null, 2));

  // Generate zip file
  const blob = await zip.generateAsync({ type: 'blob' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'react-app.zip';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}