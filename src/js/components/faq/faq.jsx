import React from "react";
import Accordion from "../accordion/accordion";

const Faq = ({ title, faqs = [] }) => {
  return (
    <section className="faq__container">
      <h2>{title}</h2>

      {faqs.length && (
        <div className="accordion__wrapper">
          {faqs.map(({ title, summary }, faqIdx) => (
            <Accordion key={faqIdx + title} title={title} summary={summary} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Faq;
