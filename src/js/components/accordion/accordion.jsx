import React, { useState } from "react";

const Accordion = ({ title, summary }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <h3
        className={`accordion ${active ? "active" : ""}`}
        style={{ fontWeight: 900 }}
        onClick={() => setActive(!active)}
      >
        {title}
      </h3>
      <div
        className={`panel ${active ? "panel-active" : ""}`}
        dangerouslySetInnerHTML={{ __html: summary }}
      ></div>
    </>
  );
};

export default Accordion;
