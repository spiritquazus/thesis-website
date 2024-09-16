export type ProductImageProps = {
  accessType: string;
}

export interface CreateUserParams {
  id: string;
  access: string | null;
  product: string | null;
  startTime: number;
  endTime?: number; // Optional parameter
}

export interface UpdateUserParams {
  id: string;
  endTime?: number; // Optional parameter
  startTime?: number; // Optional parameter, needed for totalTime calculation
  email?: string; // Optional parameter
}

export interface createSurveyParams {
  userId: string;
  questions: Array<number>;
}