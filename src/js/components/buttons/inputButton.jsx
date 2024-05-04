import React from "react";

const InputButton = props => {
  return (
    <input
      type={props.type}
      value={props.value}
      className={props.className}
      disabled={props.disabled}
      onClick={props.onButtonClick}
      onTouchStart={e => {
        e.target.classList.add("button--touch");
      }}
      onTouchEnd={e => {
        e.target.classList.remove("button--touch");
      }}
    />
  );
};

export default InputButton;
