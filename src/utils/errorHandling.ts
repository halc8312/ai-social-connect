import { toast } from "sonner";

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleApiError = (error: unknown, defaultMessage: string): never => {
  const errorMessage = error instanceof Error ? error.message : defaultMessage;
  toast.error(errorMessage);
  throw new APIError(errorMessage);
};