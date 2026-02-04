import { createContext, type Dispatch, type SetStateAction } from "react";

export const SpinnerContext = createContext<{
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}>({
  isLoading: false,
  setIsLoading: () => {},
});
