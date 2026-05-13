import "../css/sidebar.css";
import { useState, useEffect } from "react";

import cbe from "../assets/logo/CBE.png";
import awash from "../assets/logo/awsah.webp";
import dashen from "../assets/logo/dashen.png";
import nib from "../assets/logo/nib.webp";
import abyssinia from "../assets/logo/abyssinia.webp";
import abay from "../assets/logo/abay.webp";
import hibret from "../assets/logo/hibret.svg";

const logos = {
  cbe,
  awash,
  dashen,
  nib,
  abyssinia,
  abay,
  hibret,
};

function Sidebar({ data, onSelectBank, onSelectCurrency }) {
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [activeBank, setActiveBank] = useState(null);
  const [activeCurrency, setActiveCurrency] = useState(null);

  // banks
  useEffect(() => {
    if (data?.length) {
      setBanks([...new Set(data.map(b => b.bank_name))]);
    }
  }, [data]);

  // currencies
  useEffect(() => {
    if (data?.length) {
      setCurrencies([...new Set(data.map(b => b.currency_code))]);
    }
  }, [data]);

  return (
    <div className="sidebar">

      {/* BANKS */}
      <div className="card-section">
        <h3>🏦 Banks</h3>

        <div
          className={activeBank === null ? "active item" : "item"}
          onClick={() => {
            setActiveBank(null);
            onSelectBank(null);
          }}
        >
          <i class="fa-solid fa-grip"></i> All Banks
        </div>

        {banks.map(name => (
          <div
            key={name}
            className={activeBank === name ? "active item" : "item"}
            onClick={() => {
              setActiveBank(name);
              onSelectBank(name);
            }}
          >
            <img
              src={logos[name.toLowerCase()] || cbe}
              className="logo"
              alt={name}
            />
            {name}
          </div>
        ))}
      </div>

      {/* CURRENCIES */}
      <div className="card-section">
        <h3>💱 Currencies</h3>

        <div
          className={activeCurrency === null ? "active item" : "item"}
          onClick={() => {
            setActiveCurrency(null);
            onSelectCurrency(null);
          }}
        >
          <i class="fa-solid fa-money-bill-transfer"></i>All Currencies
        </div>

        {currencies.map(code => (
          <div
            key={code}
            className={activeCurrency === code ? "active item" : "item"}
            onClick={() => {
              setActiveCurrency(code);
              onSelectCurrency(code);
            }}
          >
            {code}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Sidebar;