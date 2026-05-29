import "../css/sidebar.css";
import { useState, useEffect } from "react";


import cbe from "../assets/logo/CBE.png";
import awash from "../assets/logo/awsah.webp";
import dashen from "../assets/logo/Dashen.png";
import nib from "../assets/logo/nib.webp";
import abyssinia from "../assets/logo/abyssinia.webp";
import abay from "../assets/logo/abay.webp";
import hibret from "../assets/logo/hibret.svg";
import berhan from "../assets/logo/Berhan.png";
import addis from "../assets/logo/Addis.png";
import wegagen from "../assets/logo/Wegagen.png";
import zemen from "../assets/logo/Zemen.png";
import bunna from "../assets/logo/Bunna.png";
import amhara from "../assets/logo/Amhara.png";
import oromia from "../assets/logo/Oromia.png";
import ahadu from "../assets/logo/Ahadu.svg";
import gadaa from "../assets/logo/Gadaa.png";
import enat from "../assets/logo/Enat.png";
import global from "../assets/logo/Global.svg";
import rammis from "../assets/logo/Rammis.png";
import hijra from "../assets/logo/Hijra.png";
import siinqee from "../assets/logo/Siinqee.png";
import development from "../assets/logo/Development.png";
import cooperative from "../assets/logo/Cooperative.png";


const logos = {
  cbe,
  awash,
  dashen,
  nib,
  abyssinia,
  abay,
  hibret,
  berhan,
  addis,
  wegagen,
  zemen,
  bunna,
  amhara,
  oromia,
  ahadu,
  gadaa,
  enat,
  global,
  rammis,
  hijra,
  siinqee,
  development,
  cooperative,
  
};

function Sidebar({ data, onSelectBank, onSelectCurrency, onSelectDate }) {
  const [banks, setBanks] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [activeBank, setActiveBank] = useState(null);
  const [activeCurrency, setActiveCurrency] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  console.log("Sidebar data:", selectedDate);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sidebar">
      {isMobile && (
        <div className="mobile-filters card-section mobile-card">
          <div className="mobile-filters-header">
            <div>
              <h3>Filters</h3>
              <p>Choose bank and currency to view</p>
            </div>
            <span className="mobile-tag">Quick</span>
          </div>

          <div className="mobile-select">
            <label htmlFor="date-select">Date</label>
            <input type="date" id="date-select" value={selectedDate} onChange={e => {
              const value = e.target.value || null;
              setSelectedDate(value);
              onSelectDate(value);
            }} />
          </div>  

          <div className="mobile-select">
            <label htmlFor="bank-select">Bank</label>
            <select
              id="bank-select"
              value={activeBank ?? ""}
              onChange={e => {
                const value = e.target.value || null;
                setActiveBank(value);
                onSelectBank(value);
              }}
            >
              <option value="">All Banks</option>
              {banks.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mobile-select">
            <label htmlFor="currency-select">Currency</label>
            <select
              id="currency-select"
              value={activeCurrency ?? ""}
              onChange={e => {
                const value = e.target.value || null;
                setActiveCurrency(value);
               
              }}
            >
              <option value="">All Currencies</option>
              {currencies.map(code => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="sidebar-content">
          <div className="date-card">
            <legend><i class="fa-solid fa-calendar"></i> Date</legend>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={e => {
                const value = e.target.value || null;
                setSelectedDate(value);
                onSelectDate(value);
              }}
            />
          </div>

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
              <i className="fa-solid fa-grip"></i> All Banks
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
              <i className="fa-solid fa-money-bill-transfer"></i> All Currencies
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
      )}
    </div>
  );
}

export default Sidebar;