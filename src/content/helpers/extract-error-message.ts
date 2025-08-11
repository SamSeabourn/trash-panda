export const extractErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message || error.stack || 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  try {
    return JSON.stringify(error) || 'Unknown error object';
  } catch {
    return 'Unknown error object';
  }
};
