export enum ErrorCodes {
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  FORBIDDEN = "FORBIDDEN",
  BAD_REQUEST = "BAD_REQUEST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export const isNotFoundError = (error: unknown): boolean => {
  return error instanceof Error && error.message === ErrorCodes.NOT_FOUND;
};

export const isForbiddenError = (error: unknown): boolean => {
  return error instanceof Error && error.message === ErrorCodes.FORBIDDEN;
};
