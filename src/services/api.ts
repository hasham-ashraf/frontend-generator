import { parseSSEResponse } from '../utils/parseSSE';
import type { GenerationResponse, APIError } from './types';

export async function generateCode(prompt: string): Promise<Record<string, string>> {
  try {
    const response = await fetch('https://api-frontend-generator-production.up.railway.app/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json() as APIError;
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    return parseSSEResponse(text);
  } catch (error) {
    console.error('Generation failed:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to generate code');
  }
}