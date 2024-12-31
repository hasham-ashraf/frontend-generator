export interface GenerationResponse {
  files: Record<string, string>;
}

export interface APIError {
  detail?: string;
}