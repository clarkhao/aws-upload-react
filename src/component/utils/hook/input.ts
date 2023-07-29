"use client";
import React from "react";
import { inputCheck, getErrMsg } from "../../utils";
import { ErrorContext } from "./error";

export type TInputState = {
  /**
   * isErr manage the error from validating and request error
   */
  isErr: boolean;
  inputValue: string | undefined;
  /**
   * error is the error message from validating
   */
  error: string;
};
type TInputPayload = {
  "is-err": boolean;
  "set-inputvalue": string;
  "set-error": string;
  "clear-error": string;
};
export interface IInputAction {
  type: keyof TInputPayload;
  payload: TInputPayload[IInputAction["type"]];
}

function useInput(value: string, name: string, isRequestErr?: boolean) {
  const debounceTimer = React.useRef<number>(0);
  const error = React.useContext(ErrorContext);
  const inputReducer = (state: TInputState, action: IInputAction) => {
    switch (action.type) {
      case "is-err":
        return {
          ...state,
          isErr: action.payload as boolean,
        };
      case "set-inputvalue":
        return {
          ...state,
          inputValue: action.payload as string,
        };
      case "set-error":
        return {
          ...state,
          error: action.payload as string,
          isErr: true,
        };
      case "clear-error":
        return {
          ...state,
          error: "",
          isErr: false,
        };
      default:
        return state;
    }
  };
  const initInputState: TInputState = {
    isErr: isRequestErr as boolean,
    inputValue: value ?? "",
    error: "",
  };
  const [inputState, inputDispatch] = React.useReducer(
    inputReducer,
    initInputState
  );
  React.useEffect(() => {
    inputDispatch({
      type: "is-err",
      payload: isRequestErr ?? false,
    });
    error?.setErrors({ ...error.errors, request: isRequestErr ?? false });
  }, [isRequestErr]);
  React.useEffect(() => {
    const verifyData = () => {
      console.log(`check value's availability: ${inputState.inputValue}`);
      const check = inputCheck(name).safeParse(inputState.inputValue);
      if (!check.success) {
        const msg = getErrMsg(check.error.message);
        inputDispatch({ type: "set-error", payload: msg });
        error?.setErrors({ ...error.errors, [name]: true });
      } else {
        inputDispatch({ type: "clear-error", payload: "" });
        error?.setErrors({ ...error.errors, [name]: false });
      }
    };
    if (inputState.inputValue && inputState.inputValue?.length > 0) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = window.setTimeout(verifyData, 1000);
    }
    return () => clearTimeout(debounceTimer.current);
  }, [inputState.inputValue, name]);
  return { inputState, inputDispatch };
}

export { useInput };
