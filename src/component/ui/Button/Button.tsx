//application
import React from "react";
//styles
import style from "./Button.module.css";
//components
import { FaGithub } from "react-icons/fa6";
import { getFontColor, calculateHoverColor } from "../../utils";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * is there icon
   */
  isIcon?: boolean;
  /**
   * icon on left
   */
  icon?: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * disabled
   */
  disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export default function Button({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  isIcon = false,
  icon = <FaGithub />,
  ...props
}: ButtonProps) {
  const mode = primary ? style.primary : style.secondary;
  const [isHovered, setIsHovered] = React.useState(false);
  const fontColor = getFontColor(
    backgroundColor ?? (primary ? "#1ea7fd" : "#ffffff")
  );
  const hoverColor = props.disabled
    ? "#DCDCDC"
    : calculateHoverColor(backgroundColor ?? (primary ? "#1ea7fd" : "#ffffff"));
  const hoverFontColor = getFontColor(hoverColor);
  return (
    <>
      <button
        type="button"
        className={[style.button, `storybook-button--${size}`, mode].join(" ")}
        {...props}
        disabled={props.disabled}
        style={{
          backgroundColor: isHovered ? hoverColor : backgroundColor,
          color: isHovered ? hoverFontColor : fontColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isIcon && icon}
        {label}
      </button>
    </>
  );
}
