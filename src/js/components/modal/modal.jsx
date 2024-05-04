import React from "react";

import Overlay from "../nav/overlay";

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.keydownHandler = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { isVisible } = this.props;
    document.addEventListener("keydown", this.keydownHandler);
    document.body.style.overflowY = isVisible ? "hidden" : "visible";
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler);
    document.body.style.overflowY = "visible";
  }

  componentDidUpdate() {
    const { isVisible } = this.props;
    document.body.style.overflowY = isVisible ? "hidden" : "visible";
  }

  handleKeyDown(e) {
    if (e.key === "Escape" && !document.activeElement.type) {
      this.props.onClick();
    }
  }

  render() {
    const {
      className,
      modalClassName,
      children,
      onClick,
      wide,
      isVisible
    } = this.props;
    return (
      <section className={className || ""}>
        <Overlay isVisible={isVisible} onClick={onClick} />
        <div
          className={`modal ${
            modalClassName ? `modal--${modalClassName}` : ""
          } ${wide ? "modal--wide" : ""}`}
        >
          {children}
        </div>
      </section>
    );
  }
}

export default Modal;
