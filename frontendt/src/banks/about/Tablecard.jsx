import "./css/tablecard.css";
import codelogo from "../../lib/flags.js"
import { useState } from "react";
function Tablecard({ bankdata,SelectedCurrency}) {
  const [choosen,setchoosen]=useState("USD")


  const lastUpdate =
    bankdata?.data?.length > 0
      ? new Date(
          bankdata.data[bankdata.data.length - 1].created_at
        ).toLocaleDateString()
      : "";

  return (
    <div className="tablecard-con">
      <div className="top con">
        <h3>current rates</h3>
        <p>last updated: {lastUpdate}</p>
      </div>

      {bankdata?.data?.map((e, index) => {
        const code = e.currency_code?.toLowerCase();

        const flagSrc = codelogo?.[code]
          ? `https://flagcdn.com/w40/${codelogo[code]}.png`
          : "https://flagcdn.com/w40/un.png";

        return (<div className={`rate-card ${choosen === e.currency_code ? "selected" : ""}`}
                    key={index}
                    onClick={() => {
                    setchoosen(e.currency_code);
                    SelectedCurrency(e.currency_code)
  }}
>
            <div className="left">
              <div className="code-box">
                <img src={flagSrc} alt="flag" className="flag" />
                <h3>{e.currency_code}</h3>
              </div>
            </div>

            <div className="right">
              <div className="rate">
                <span className="buy-con">{e.buy}</span>
              </div>

              <div className="rate">
                <span className="sell-con">{e.sell}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tablecard;