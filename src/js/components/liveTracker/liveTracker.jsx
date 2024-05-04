import React from "react";
import { useLiveCounter } from "../../hooks";

const LiveTracker = ({
  title,
  summary,
  prizesPaidOut,
  prizesPaidOutSummary,
  currency,
  winners,
  winnersSummary
}) => {
  const [paidAmount, totalWinners] = useLiveCounter({
    defaultPaidOutValue: prizesPaidOut,
    defaultWinnersValue: winners,
    updateIntervalInSeconds: 3
  });

  return (
    <section className="live-tracker">
      <h2 style={{ fontWeight: 900 }}>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: summary }}></div>

      <div className="stats__container">
        <div className="stats__container__item">
          <h2>{`${currency}${new Intl.NumberFormat("en-UK", {
            maximumSignificantDigits: 9
          }).format(paidAmount)}`}</h2>
          <p>{prizesPaidOutSummary}</p>
        </div>

        <div className="stats__container__item">
          <h2>
            {new Intl.NumberFormat("en-UK", {
              maximumSignificantDigits: 9
            }).format(totalWinners)}
          </h2>
          <p>{winnersSummary}</p>
        </div>
      </div>
    </section>
  );
};

export default LiveTracker;
