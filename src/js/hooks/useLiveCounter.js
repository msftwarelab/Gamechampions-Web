import {
  getDayOfYear,
  getHours,
  getMinutes,
  getSeconds,
  getYear
} from "date-fns";
import { useEffect, useState } from "react";

const TODAY = new Date();
const MAX_VALUE_AT_CURRENT_TIME =
  getYear(TODAY) +
  getDayOfYear(TODAY) +
  getHours(TODAY) +
  getMinutes(TODAY) +
  getSeconds(TODAY);
const LS_VALUE_KEY = "live-status-values";

const useLiveCounter = ({
  defaultPaidOutValue = 0,
  defaultWinnersValue = 0,
  updateIntervalInSeconds = 1,
  paidAmountRandomness = {
    min: 10,
    max: 50
  },
  totalWinnersRandomness = {
    min: 1,
    max: 5
  }
}) => {
  const [paidAmount, setPaidAmount] = useState(defaultPaidOutValue);
  const [totalWinners, setTotalWinners] = useState(defaultWinnersValue);

  useEffect(() => {
    const revivedValues = reviveValues();

    if (!revivedValues) {
      setPaidAmount(paidAmount => paidAmount + MAX_VALUE_AT_CURRENT_TIME);
      setTotalWinners(totalWinners => totalWinners + MAX_VALUE_AT_CURRENT_TIME);
    } else {
      setPaidAmount(revivedValues.paidAmountValue);
      setTotalWinners(revivedValues.totalWinnersValue);
    }

    updateStats();

    const interval = setInterval(
      () => updateStats(),
      updateIntervalInSeconds * 1000
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    flushValues();
  }, [paidAmount, totalWinners]);

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const flushValues = () => {
    localStorage.setItem(
      LS_VALUE_KEY,
      JSON.stringify({
        paidAmountValue: paidAmount,
        totalWinnersValue: totalWinners
      })
    );
  };

  const reviveValues = () => {
    let values = null;

    try {
      values = JSON.parse(localStorage.getItem(LS_VALUE_KEY));
    } catch (err) {
      console.error(err);
    }

    return values
      ? {
          paidAmountValue: parseInt(values.paidAmountValue),
          totalWinnersValue: parseInt(values.totalWinnersValue)
        }
      : null;
  };

  const updateStats = () => {
    setPaidAmount(
      paidAmount =>
        paidAmount +
        getRandomNumber(paidAmountRandomness.min, paidAmountRandomness.max)
    );
    setTotalWinners(
      totalWinners =>
        totalWinners +
        getRandomNumber(totalWinnersRandomness.min, totalWinnersRandomness.max)
    );
  };

  return [paidAmount, totalWinners];
};

export default useLiveCounter;
