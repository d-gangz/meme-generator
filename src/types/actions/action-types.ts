export type ActionState<T = void> = {
  isSuccess: boolean;
  message: string;
  data?: T;
};
