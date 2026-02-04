import { useState, type ReactNode } from "react";
import { SpinnerContext } from "../SpinnerContext";

type PropTypes = {
  children: ReactNode;
};

export const SpinnerContextProvider = ({ children }: PropTypes) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </SpinnerContext.Provider>
  );
};
