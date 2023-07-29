//应用
import React, { useRef, useId } from "react";
//style
import style from "./Input.module.css";
//hooks
import { useInput } from "../../utils/hook/input";
//components
import PWDVisibility from "../PWDVisibility/PWDVisibility";
import { FiXCircle } from "react-icons/fi";

export type TInput = {
  /**
   * type indicated icon and input type,
   * 'email'|'password'|'text'|'search'
   */
  type: string;
  /**
   * optional text used in label
   */
  labelText?: string;
  /**
   * isOutlined
   */
  isOutlined?: boolean;
  /**
   * value
   */
  value?: string;
  /**
   * input name prop
   */
  name: string;
  /**
   * handleChange used for state bind
   */
  handleInput?: (value: string) => void;
  /**
   * errMsg indicate error returned from request result
   */
  isRequestErr?: boolean;
  /**
   * handleFocus用于在父级中清除errMsg，重新渲染后Input错误消失
   */
  handleFocus?: () => void;
  /**
   * handle enter click event
   */
  handleEnterClick?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * icon component
   */
  icon?: React.ReactNode;
};

function InputUI({ type, value, icon = null, ...props }: TInput) {
  const inputId = useId();
  const { inputState, inputDispatch } = useInput(
    value as string,
    props.name,
    props.isRequestErr
  );
  const [visible, setVisible] = React.useState(true);
  const [inputType, setInputType] = React.useState(type);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleControlFocus: React.MouseEventHandler = (e) => {
    e.preventDefault();
    inputRef.current && inputRef.current.focus();
  };
  /**
   * oninput事件更新input中的value
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (props.handleInput) {
      props.handleInput(e.target.value);
    }
    inputDispatch({ type: "set-inputvalue", payload: e.target.value });
    inputDispatch({ type: "clear-error", payload: "" });
  };
  /**
   * onfocus事件时，取消error显示
   */
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    inputDispatch({ type: "is-err", payload: false });
    inputDispatch({ type: "clear-error", payload: "" });
    if (props.handleFocus) props.handleFocus();
  };
  return (
    <div className={style.inputWrapper}>
      <div
        className={[style.container, inputState.isErr ? style.error : ""].join(
          " "
        )}
      >
        <input
          className={[
            inputState.isErr ? style.error : "",
            icon === null ? "" : style.indent,
            props.isOutlined ? style.outlined : style.input,
            style.light
          ].join(" ")}
          ref={inputRef}
          id={inputId}
          type={inputType}
          name={props.name}
          value={value ?? inputState.inputValue}
          onInput={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={props.handleEnterClick}
          placeholder=" "
          data-testid="input"
        />

        <label className={style.label} htmlFor={inputId}></label>
        <span className={style.licon} onClick={handleControlFocus}>
          {icon === null ? null : icon}
        </span>
        <p
          className={[style.placeholder, icon === null ? style.nicon : ""].join(
            " "
          )}
          onClick={handleControlFocus}
        >
          {props.labelText}
        </p>
        <span className={style.ricon}>
          {type === "Search" ? null : type === "password" ? (
            <PWDVisibility
              isHidden={visible}
              setHidden={setVisible}
              {...props}
              setInputType={setInputType}
            />
          ) : (
            <FiXCircle
              onClick={() => {
                if (props.handleInput) {
                  props.handleInput("");
                }
                inputDispatch({ type: "set-inputvalue", payload: "" });
              }}
            />
          )}
        </span>
      </div>
      <span className={[style.errMsg, style.error].join(" ")}>
        {inputState.error}
      </span>
    </div>
  );
}

export default InputUI;
