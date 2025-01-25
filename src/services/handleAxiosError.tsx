import { AxiosError } from "axios";

const handleAxiosError = (
  error: AxiosError,
  setError: (message: string) => void
) => {
  if (error?.request?.response) {
    setError(error.request.response); // Backend-provided error message
  } else if (error.message) {
    setError(error.message); // General error message
  } else {
    setError("An unexpected error occurred."); // Fallback error
  }
};

export default handleAxiosError;
