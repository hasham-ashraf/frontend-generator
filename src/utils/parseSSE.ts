/**
 * Parses SSE response text into JSON
 * Handles both single and multiple SSE messages
 */
export function parseSSEResponse(text: string): Record<string, string> {
  // Split into lines and filter out empty ones
  const lines = text.split('\n').filter(line => line.trim());
  
  // Get the last data line (in case of multiple updates)
  const dataLine = lines
    .reverse()
    .find(line => line.startsWith('data: '));
    
  if (!dataLine) {
    throw new Error('No valid data found in response');
  }
  
  // Remove 'data: ' prefix and parse JSON
  const jsonStr = dataLine.replace(/^data: /, '').trim();
  try {
    const parsed = JSON.parse(jsonStr);
    // Transform the files to have proper paths
    const files: Record<string, string> = {};
    Object.entries(parsed).forEach(([path, content]) => {
      // Ensure path starts with /src/ for source files
      const normalizedPath = path.includes('/') ? path : `/src/${path}`;
      files[normalizedPath] = content as string;
    });
    return files;
  } catch (error) {
    throw new Error('Invalid JSON in response');
  }
}