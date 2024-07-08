/* eslint-disable no-unused-vars */
export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    public message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
  }
}

export class AuthenticationError extends AppError {
  constructor() {
    super(ErrorCode.NOT_AUTHORIZED, "You must be logged in to view this content");
    this.name = "AuthenticationError";
  }
}

export class EmailInUseError extends AppError {
  constructor() {
    super(ErrorCode.CONFLICT, "Email is already in use");
    this.name = "EmailInUseError";
  }
}

export class NotFoundError extends AppError {
  constructor() {
    super(ErrorCode.NOT_FOUND, "Resource not found");
    this.name = "NotFoundError";
  }
}

export class TokenExpiredError extends AppError {
  constructor() {
    super(ErrorCode.FORBIDDEN, "Token has expired");
    this.name = "TokenExpiredError";
  }
}

export class LoginError extends AppError {
  constructor() {
    super(ErrorCode.NOT_AUTHORIZED, "Invalid email or password");
    this.name = "LoginError";
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(ErrorCode.TOO_MANY_REQUESTS, "Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

export enum ErrorCode {
  INPUT_PARSE_ERROR = "INPUT_PARSE_ERROR",
  OUTPUT_PARSE_ERROR = "OUTPUT_PARSE_ERROR",
  ERROR = "ERROR",
  NOT_AUTHORIZED = "NOT_AUTHORIZED",
  TIMEOUT = "TIMEOUT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  PRECONDITION_FAILED = "PRECONDITION_FAILED",
  PAYLOAD_TOO_LARGE = "PAYLOAD_TOO_LARGE",
  METHOD_NOT_SUPPORTED = "METHOD_NOT_SUPPORTED",
  UNPROCESSABLE_CONTENT = "UNPROCESSABLE_CONTENT",
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  CLIENT_CLOSED_REQUEST = "CLIENT_CLOSED_REQUEST",
  INSUFFICIENT_CREDITS = "INSUFFICIENT_CREDITS",
  PAYMENT_REQUIRED = "PAYMENT_REQUIRED",
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  console.error("Unhandled error:", error);
  return new AppError(ErrorCode.INTERNAL_SERVER_ERROR, "An unexpected error occurred", {
    originalError: error instanceof Error ? error.message : String(error),
  });
}

export function getHttpStatusFromErrorCode(code: ErrorCode): number {
  switch (code) {
    case ErrorCode.NOT_AUTHORIZED:
      return 401;
    case ErrorCode.FORBIDDEN:
      return 403;
    case ErrorCode.NOT_FOUND:
      return 404;
    case ErrorCode.CONFLICT:
      return 409;
    case ErrorCode.TOO_MANY_REQUESTS:
      return 429;
    case ErrorCode.UNPROCESSABLE_CONTENT:
      return 422;
    case ErrorCode.INTERNAL_SERVER_ERROR:
    default:
      return 500;
  }
}
