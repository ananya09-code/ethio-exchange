import "../css/calculator.css";

import { useState, useEffect } from "react";

function Calculator({ data }) {

  // FORM STATE
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedRate, setSelectedRate] = useState("buy");

  // RESULT STATE
  const [result, setResult] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // DROPDOWN DATA
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  // GET UNIQUE BANKS
  useEffect(() => {
    if (data?.length) {
      setBanks([...new Set(data.map(b => b.bank_name))]);
    }
  }, [data]);

  // GET UNIQUE CURRENCIES
  useEffect(() => {
    if (data?.length) {
      setCurrencies([...new Set(data.map(b => b.currency_code))]);
    }
  }, [data]);

  // CALCULATE
  function getValues() {

    // SAFETY CHECKS
    if (
      !selectedBank ||
      !selectedCurrency ||
      !amount
    ) {
      return;
    }

    // FILTER DATA
    const filteredData = data.filter(
      item =>
        item.bank_name === selectedBank &&
        item.currency_code === selectedCurrency
    );

    // NO DATA FOUND
    if (filteredData.length === 0) {
      return;
    }

    // TODAY
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // FIND CLOSEST DATE
    const closest = filteredData.reduce((prev, curr) => {

      const prevDiff =
        Math.abs(new Date(prev.created_at) - today);

      const currDiff =
        Math.abs(new Date(curr.created_at) - today);

      return currDiff < prevDiff ? curr : prev;

    });

    // CALCULATE RESULT
    const rate =
      selectedRate === "buy"
        ? closest.buy
        : closest.sell;

    const finalResult =
      Math.round(rate * Number(amount));

    setResult(finalResult);

    // SHOW RESULT CARD
    setIsVisible(true);

    console.log(finalResult);
  }

  return (
    <div className="calculator">

      {/* FORM */}
      <div className="form-con">

        <fieldset>

          <legend><i class="fa-solid fa-arrow-right-arrow-left"></i> Currency Calculator</legend>

          {/* BANK */}
          <label htmlFor="SelectBank">
            Select Bank
          </label>

          <select
            name="SelectBank"
            id="SelectBank"
            value={selectedBank}
            onChange={(e) => {
              setSelectedBank(e.target.value);
            }}
          >

            <option value="">
              Choose Bank
            </option>

            {banks.map(name => (
              <option
                key={name}
                value={name}
              >
                {name}
              </option>
            ))}

          </select>

          {/* CURRENCY */}
          <label htmlFor="from">
            Currency
          </label>

          <select
            name="from"
            id="from"
            value={selectedCurrency}
            onChange={(e) => {
              setSelectedCurrency(e.target.value);
            }}
          >

            <option value="">
              Choose Currency
            </option>

            {currencies.map(name => (
              <option
                key={name}
                value={name}
              >
                {name}
              </option>
            ))}

          </select>

          {/* RATE */}
          <label htmlFor="rate">
            Rate Type
          </label>

          <select
            name="rate"
            id="rate"
            value={selectedRate}
            onChange={(e) => {
              setSelectedRate(e.target.value);
            }}
          >

            <option value="buy">
              Cash Buying
            </option>

            <option value="sell">
              Cash Selling
            </option>

          </select>

          {/* AMOUNT */}
          <label htmlFor="amount">
            Amount
          </label>

          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />

          {/* BUTTON */}
          <button onClick={getValues}>
            Calculate
          </button>

        </fieldset>

      </div>

      {/* RESULT */}
      {isVisible && (
        <div className="result">

          <p>Exchange Result</p>

          <h3>
            {result} Birr
          </h3>

          <p>
            <i className="fa-solid fa-clock"></i>

            {" "}

            {new Date().toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric"
              }
            )}
          </p>

        </div>
      )}

    </div>
  );
}

export default Calculator;