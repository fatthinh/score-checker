import React from "react";
import { useState, useRef } from "react";
import Spinner from "./Spinner";

// Button
const Button = ({
  primary,
  secondary,
  outline,
  icon,
  color,
  text,
  onClick = () => {},
  className,
  type = "button",
  loading,
  disabled,
}) => {
  const [loadingVisible, setLoadingVisible] = useState(false);
  const buttonRef = useRef();

  const isValidForm = () => {
    const form = buttonRef.current.closest("form"); // Get the parent form
    return form ? form.checkValidity() : false; // Return true or false based on validity
  };

  const onClickBtn = () => {
    if (!isValidForm() && type === "submit") {
      return;
    }

    if (loading) {
      setLoadingVisible(true);
      setTimeout(() => {
        setLoadingVisible(false);
        onClick();
      }, 1000);
    } else {
      onClick();
    }
  };

  const primaryStyle = "bg-primary-600 !text-primary-200";
  const secondaryStyle = "bg-neutral-600 !text-neutral-200";
  const outlineStyle = "!border-primary-600 text-primary-600";
  const disabledStyle =
    "opacity-50 cursor-not-allowed !translate-y-0 !transition-none";

  return (
    <button
      type={type}
      onClick={onClickBtn}
      style={{ color }}
      className={`hover:cursor-pointer px-4 py-2 border-2 border-transparent rounded-md relative after:absolute after:bg-black after:w-0 after:h-full after:top-0 after:right-0 after:transition-all after:duration-500 after:ease-in-out after:opacity-20 hover:after:w-full after:rounded hover:after:left-0 text-black font-medium
            ${primary && primaryStyle} 
            ${secondary && secondaryStyle} 
            ${outline && outlineStyle} 
            ${disabled && disabledStyle}
            ${className}`}
      disabled={disabled}
      ref={buttonRef}
    >
      <div className="flex justify-center items-center">
        {loadingVisible ? (
          <Spinner size={24} />
        ) : (
          <>
            {text} {icon && <span className="ml-4">{icon}</span>}
          </>
        )}
      </div>
    </button>
  );
};

export default Button;
