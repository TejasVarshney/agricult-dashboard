export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

export const handleApiError = (error) => {
  if (error instanceof ApiError) {
    // Handle specific API errors
    console.error(`API Error (${error.status}):`, error.message);
    return error;
  }
  
  // Handle generic errors
  console.error('Application Error:', error);
  return new Error('An unexpected error occurred');
}; 