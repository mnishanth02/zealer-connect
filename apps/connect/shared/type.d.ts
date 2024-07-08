import { AppError } from "@/lib/helper/errors";

export type ServiceResponse<T> = {
  data: T | null;
  error: AppError | null;
};
