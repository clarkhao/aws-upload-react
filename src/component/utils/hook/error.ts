import React from "react";

type TError = {
  errors: Record<string, boolean>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export const ErrorContext = React.createContext<TError | null>(null);
