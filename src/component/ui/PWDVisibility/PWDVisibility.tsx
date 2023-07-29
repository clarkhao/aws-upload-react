//app
import React from "react";
//style
import style from "./PWDVisibility.module.css";
//components
import { FiEye, FiEyeOff } from "react-icons/fi";

interface IPWDVisibility {
  isHidden?: boolean;
  setHidden?: (bool: boolean) => void;
  setInputType: (type: string) => void;
}
function PWDVisibility({...props }: IPWDVisibility) {
  const [visible, setVisible] = React.useState(props.isHidden ?? true);
  return (
    <div data-testid="pwd-visibility" className={style.eye} onClick={() => {
      (props.setHidden ?? setVisible)(!(props.isHidden ?? visible));
      if(props.isHidden) props.setInputType("text")
      else props.setInputType("password")
    }}>
      {props.isHidden ?? visible ? <FiEyeOff /> : <FiEye />}
    </div>
  );
}

export default PWDVisibility;
